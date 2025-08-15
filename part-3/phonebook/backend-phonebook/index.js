require('dotenv').config();   
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

// // Sample phonebook data
// let persons = [
//   { id: '1', name: 'Arto Hellas', number: '040-123456' },
//   { id: '2', name: 'Ada Lovelace', number: '39-44-5323523' },
//   { id: '3', name: 'Dan Abramov', number: '12-43-234345' },
//   { id: '4', name: 'Mary Poppendieck', number: '39-23-6423122' },
// ];
const person = require('./models/phonebook')




// API Routes
app.get('/api/persons', (req, res) => {
   person.find({}).then(result=>{
    res.json(result)
   })
});

app.get('/info', (req, res) => {
  const date = new Date();
  person.countDocuments({})
  .then(res=>{
    length = res;
  })
  res.send(`
    <h1>Phonebook has info for ${length} people</h1>
    <h2>${date}</h2>
  `);
});

app.get('/api/persons/:id', (req, res) => {
const id = req.params.id
   person.findById(id)
   .then(result=>{
 res.json(result)
   })

});


app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id;
    person.findByIdAndDelete(id)
    .then(result=>{
      res.json(result)
    })
});


app.post('/api/persons', (req, res) => {

  const body = req.body;

  const newPerson = new person(  {
    name : body.name,
    number : body.number,
  })
  newPerson.save()
  .then(result=>{
    res.json(result)
  })
});

const path = require('path');
app.use(express.static(path.join(__dirname, '../frontend-phonebook/dist')));

// SPA fallback
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend-phonebook/dist', 'index.html'));
});


// // Serve frontend build
// app.use(express.static(path.join(__dirname, '../frontend-phonebook/dist')));

// // Serve index.html for all other routes (so React routing works)
// app.get('*', (req, res) => {
//   res.sendFile(
//     path.resolve(__dirname, '../frontend-phonebook/dist', 'index.html')
//   );
// });

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
