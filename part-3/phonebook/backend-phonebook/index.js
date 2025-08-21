require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const Person = require('./models/phonebook'); // Changed from Persons to Person

const app = express(); // Changed from server to app (more conventional)

// Middleware
app.use(express.json());
app.use(express.static('dist'));
app.use(cors());

// Morgan logging with custom body token
morgan.token('body', (req) => {
  return req.method === 'POST' ? JSON.stringify(req.body) : '';
});
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
);

// Root
app.get('/', (req, res) => {
  res.send('Welcome to the Phone Book App');
});

// Get all persons
app.get('/api/persons', (req, res, next) => {
  Person.find({})
    .then((result) => res.json(result))
    .catch((err) => next(err));
});

// Info page
app.get('/info', (req, res, next) => {
  const now = new Date();
  Person.countDocuments({})
    .then((count) => {
      res.send(
        `<h1>Phonebook has info for ${count} people.</h1><h2>${now}</h2>`
      );
    })
    .catch((err) => next(err));
});

// Get person by ID
app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (!person) {
        return res.status(404).json({ error: 'Person not found' });
      }
      res.json(person);
    })
    .catch((err) => next(err));
});

// Delete person
app.delete('/api/persons/:id', (req, res, next) => {
  const id = req.params.id;
  console.log(`Deleting person with ID: ${id}`);
  
  Person.findByIdAndDelete(id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({ error: 'Person not found' });
      }
      res.status(204).end();
    })
    .catch((err) => next(err));
});

// Add person
app.post('/api/persons', (req, res, next) => {
  const { name, number } = req.body;

  // Basic validation (Mongoose schema will handle detailed validation)
  if (!name || !number) {
    return res.status(400).json({ error: 'Name and number are required' });
  }

  // Check for duplicate names
  Person.findOne({ name })
    .then(existingPerson => {
      if (existingPerson) {
        return res.status(400).json({ error: 'Name must be unique' });
      }

      const person = new Person({
        name: name.trim(),
        number: number.trim()
      });

      return person.save();
    })
    .then(savedPerson => {
      if (savedPerson) {
        res.status(201).json(savedPerson);
      }
    })
    .catch(error => next(error));
});

// Update person
app.put('/api/persons/:id', (req, res, next) => {
  const { name, number } = req.body;

  // Validate request
  if (!name || !number) {
    return res.status(400).json({ error: 'Name and number are required' });
  }

  const personData = {
    name: name.trim(),
    number: number.trim()
  };

  // Update the person
  Person.findByIdAndUpdate(
    req.params.id,
    personData,
    { new: true, runValidators: true, context: 'query' }
  )
    .then(updatedPerson => {
      if (!updatedPerson) {
        return res.status(404).json({ error: 'Person not found' });
      }
      res.json(updatedPerson);
    })
    .catch(err => next(err));
});

// Fallback for SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Error handling middleware
app.use((error, req, res, ) => {
  console.error('Error details:', error.message);

  if (error.name === 'CastError') {
    return res.status(400).json({ error: 'Invalid ID format' });
  } 
  else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message });
  }
  else if (error.code === 11000) {
    return res.status(400).json({ error: 'Name must be unique' });
  }

  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});