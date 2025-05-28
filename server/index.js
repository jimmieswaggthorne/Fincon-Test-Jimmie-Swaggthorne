import express from 'express';
import cors from 'cors';

import bodyParser from 'body-parser';
const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Endpoint to fetch categories from OpenTDB and return to client
app.get('/api/categories', async (req, res) => {
  try {
    const response = await fetch('https://opentdb.com/api_category.php');
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// Endpoint to fetch quiz questions from OpenTDB and return to client
app.get('/api/questions', async (req, res) => {
  const { amount = 5, category, difficulty, type = 'multiple' } = req.query;
  let url = `https://opentdb.com/api.php?amount=${amount}`;
  if (category) url += `&category=${category}`;
  if (difficulty) url += `&difficulty=${difficulty}`;
  if (type) url += `&type=${type}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch questions' });
  }
});
// POST endpoint to receive form data
app.post('/api/submit', (req, res) => {
  res.status(201).json({ message: 'Submission successful' });
});

// GET endpoint to fetch all submissions
app.get('/api/submissions', (req, res) => {
  res.json(submissions);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
