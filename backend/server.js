const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = 5001;

app.use(cors());
app.use(bodyParser.json());

const questions = JSON.parse(fs.readFileSync('/Users/praneethkoushik/quiz-website/backend/questions.json', 'utf8')).Sheet1.map(row => {
  const options = [];
  for (let i = 1; i <= 4; i++) {
    if (row[`Option ${i}`]) {
      options.push(row[`Option ${i}`]);
    }
  }
  return {
    question: row.Description,
    options: options,
    answer: row.Correct_Answer.join(',')
  };
});

app.get('/api/questions', (req, res) => {
  res.json(questions);
});

// Serve static files from React app
app.use(express.static('/Users/praneethkoushik/quiz-website/frontend/build'));

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  res.sendFile('/Users/praneethkoushik/quiz-website/frontend/build/index.html');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
