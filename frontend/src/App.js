import React, { useState, useEffect } from "react";

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [quizStarted, setQuizStarted] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [quizFinished, setQuizFinished] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showSubmitConfirmation, setShowSubmitConfirmation] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5001/api/questions")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched questions:", data); // Debugging statement
        setQuestions(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching questions:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (quizStarted && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleNextQuestion();
    }
  }, [timeLeft, quizStarted]);

  const handleStartQuiz = () => {
    setQuizStarted(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setTimeLeft(30);
    } else {
      setQuizFinished(true);
    }
  };

  const handleAnswer = (answer) => {
    const currentAnswers = userAnswers[currentQuestion] || [];
    const updatedAnswers = currentAnswers.includes(answer)
      ? currentAnswers.filter((a) => a !== answer)
      : [...currentAnswers, answer];

    setUserAnswers([
      ...userAnswers.slice(0, currentQuestion),
      updatedAnswers,
      ...userAnswers.slice(currentQuestion + 1),
    ]);
  };

  const calculateScore = () => {
    let score = 0;
    userAnswers.forEach((answers, index) => {
      const correctAnswers = questions[index].answer.split(",");
      if (
        answers &&
        answers.length === correctAnswers.length &&
        answers.every((a) => correctAnswers.includes(a))
      ) {
        score++;
      }
    });
    return score;
  };

  const handleSubmitQuiz = () => {
    setShowSubmitConfirmation(true);
  };

  const confirmSubmitQuiz = () => {
    setShowSubmitConfirmation(false);
    setQuizFinished(true);
  };

  const cancelSubmitQuiz = () => {
    setShowSubmitConfirmation(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log("Current Question:", currentQuestion); // Debugging statement
  console.log("Questions Length:", questions.length); // Debugging statement
  console.log("Current Question Data:", questions[currentQuestion]); // Debugging statement

  return (
    <div>
      <h1>Quiz App</h1>
      {!quizStarted ? (
        <button onClick={handleStartQuiz}>Start Quiz</button>
      ) : quizFinished ? (
        <div>
          <h2>Quiz Finished!</h2>
          <p>
            Your Score: {calculateScore()} out of {questions.length}
          </p>
        </div>
      ) : (
        questions.length > 0 && (
          <div>
            <h2>{questions[currentQuestion].question}</h2>
            <ul>
              {questions[currentQuestion].options &&
                questions[currentQuestion].options.map((option, index) => (
                  <li key={index}>
                    <label>
                      <input
                        type="checkbox"
                        checked={(userAnswers[currentQuestion] || []).includes(
                          (index + 1).toString()
                        )}
                        onChange={() => handleAnswer((index + 1).toString())}
                      />
                      {option}
                    </label>
                  </li>
                ))}
            </ul>
            <button onClick={handleNextQuestion}>Next Question</button>
            <button onClick={handleSubmitQuiz}>Submit Quiz</button>
            <p>Time Left: {timeLeft} seconds</p>
          </div>
        )
      )}
      {showSubmitConfirmation && (
        <div>
          <p>Are you sure you want to submit the quiz?</p>
          <button onClick={confirmSubmitQuiz}>Yes</button>
          <button onClick={cancelSubmitQuiz}>No</button>
        </div>
      )}
    </div>
  );
}

export default App;
