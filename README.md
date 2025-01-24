# Quiz Website

A full-stack quiz application with React frontend and Node.js/Express backend. Add your own questions in json format.

## Project Structure

```
quiz-website/
├── backend/               # Backend server code
│   ├── server.js          # Express server
│   ├── questions.json     # Quiz questions data
│   └── package.json       # Backend dependencies
├── frontend/              # React frontend code
│   ├── public/            # Static assets
│   ├── src/               # React components
│   └── package.json       # Frontend dependencies
└── README.md              # This file
```

## Installation

1. Install backend dependencies:
```bash
cd backend
npm install
```

2. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

3. Build the frontend:
```bash
npm run build
```

## Running the Application

1. Start the backend server:
```bash
cd backend
npm start
```

2. The application will be available at:
```
http://localhost:5001
```

## Development

To run the frontend in development mode:
```bash
cd frontend
npm start
```

This will start the React development server on port 3000.
