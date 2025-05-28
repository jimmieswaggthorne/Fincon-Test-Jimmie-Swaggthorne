# Fincon Quiz App

This is a full-stack quiz application built with React, Redux, and TypeScript for the frontend, and Node.js for the backend. The app allows users to take quizzes, submit answers, and view their results.

## Features

- Dynamic quiz questions
- Answer selection and validation
- Result feedback (correct/incorrect answers)
- Ability to restart and take a new quiz
- State management with Redux
- TypeScript for type safety
- Responsive UI with Bootstrap

## Project Structure

```
client/
  src/
    components/
      Quiz/
        Questions.tsx        # Main quiz logic and UI
        QuestionItem.tsx     # Individual question component
      Steps/
        QuizRequestForm.tsx  # Form to request a quiz
    services/
      FormServices.ts        # API calls for quiz submission
    formSlice.ts             # Redux slice for quiz state
    store.ts                 # Redux store setup
  public/
    ...                      # Static assets
  package.json               # Frontend dependencies
server/
  index.js                   # Backend server (Node.js/Express)
  package.json               # Backend dependencies
```

## Getting Started

### Prerequisites
- Node.js (v16 or later recommended)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```sh
   git clone <your-repo-url>
   cd "Fincon Test"
   ```

2. **Install frontend dependencies:**
   ```sh
   cd client
   npm install
   # or
   yarn install
   ```

3. **Install backend dependencies:**
   ```sh
   cd ../server
   npm install
   # or
   yarn install
   ```

### Running the App

1. **Start the backend server:**
   ```sh
   cd server
   npm start
   ```
   The backend will run on [http://localhost:5000](http://localhost:5000) by default.

2. **Start the frontend React app:**
   ```sh
   cd client
   npm start
   ```
   The frontend will run on [http://localhost:3000](http://localhost:3000) by default.

### Running Tests

From the `client` directory:
```sh
npm test
# or
yarn test
```

## Customization
- To add or modify quiz questions, update the backend logic or connect to an external API.
- UI can be customized in the `client/src/components/Quiz` and `client/src/App.css` files.

## Technologies Used
- React
- Redux Toolkit
- TypeScript
- Node.js / Express
- Bootstrap (for styling)

## License
This project is for demonstration purposes.
