const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Morgan setup for logging
morgan.token('body', (req) =>
  req.method === 'POST' ? JSON.stringify(req.body) : ''
);
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
);

// Sample phonebook data
let persons = [
  { id: '1', name: 'Arto Hellas', number: '040-123456' },
  { id: '2', name: 'Ada Lovelace', number: '39-44-5323523' },
  { id: '3', name: 'Dan Abramov', number: '12-43-234345' },
  { id: '4', name: 'Mary Poppendieck', number: '39-23-6423122' },
];

// API Routes
app.get('/api/persons', (req, res) => {
  res.json(persons);
});

app.get('/info', (req, res) => {
  const date = new Date();
  res.send(`
    <h1>Phonebook has info for ${persons.length} people</h1>
    <h2>${date}</h2>
  `);
});

app.get('/api/persons/:id', (req, res) => {
  const person = persons.find((p) => p.id === req.params.id);
  if (!person) {
    return res.status(404).end();
  }
  res.json(person);
});

app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id;
  const exists = persons.some((p) => p.id === id);

  if (!exists) {
    return res.status(404).end();
  }

  persons = persons.filter((p) => p.id !== id);
  res.status(204).end();
});

app.post('/api/persons', (req, res) => {
  const { name, number } = req.body;

  if (!name || !number) {
    return res.status(400).json({ error: 'Name or number missing' });
  }

  if (persons.find((p) => p.name === name)) {
    return res.status(400).json({ error: 'Name must be unique' });
  }

  const newPerson = {
    id: Math.random().toString(),
    name,
    number,
  };

  persons.push(newPerson);
  res.status(201).json(newPerson);
});

// Serve frontend build
app.use(express.static(path.join(__dirname, '../frontend-phonebook/dist')));

// Serve index.html for all other routes (so React routing works)
app.get('*', (req, res) => {
  res.sendFile(
    path.resolve(__dirname, '../frontend-phonebook/dist', 'index.html')
  );
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
