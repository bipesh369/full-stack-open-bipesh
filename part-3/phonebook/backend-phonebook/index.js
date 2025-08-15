require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const person = require('./models/phonebook');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Morgan setup for logging POST body
morgan.token('body', (req) =>
  req.method === 'POST' ? JSON.stringify(req.body) : ''
);
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
);

// API Routes

// Get all persons
app.get('/api/persons', (req, res, next) => {
  person.find({})
    .then(result => res.json(result))
    .catch(next);
});

// Info route
app.get('/info', (req, res, next) => {
  const date = new Date();
  person.countDocuments({})
    .then(count => {
      res.send(`
        <h1>Phonebook has info for ${count} people</h1>
        <h2>${date}</h2>
      `);
    })
    .catch(next);
});

// Get person by ID
app.get('/api/persons/:id', (req, res, next) => {
  person.findById(req.params.id)
    .then(result => {
      if (result) res.json(result);
      else res.status(404).end();
    })
    .catch(next);
});

// Delete person by ID
app.delete('/api/persons/:id', (req, res, next) => {
  person.findByIdAndDelete(req.params.id)
    .then(result => {
      if (result) res.json(result);
      else res.status(404).end();
    })
    .catch(next);
});

// Add new person
app.post('/api/persons', (req, res, next) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({ error: 'Name and number are required' });
  }

  const newPerson = new person({
    name: body.name,
    number: body.number,
  });

  newPerson.save()
    .then(result => res.json(result))
    .catch(next);
});

// Serve frontend build
app.use(express.static(path.join(__dirname, '../frontend-phonebook/dist')));

// Serve index.html for all other routes (React routing)
app.get('*', (req, res) => {
  res.sendFile(
    path.resolve(__dirname, '../frontend-phonebook/dist', 'index.html')
  );
});

// Error handler
app.use((error, req, res, next) => {
  console.error(error.message);
  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'Malformed ID' });
  }
  res.status(500).send({ error: 'Something went wrong' });
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
