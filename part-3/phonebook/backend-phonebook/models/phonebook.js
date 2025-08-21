const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI;

mongoose.set('strictQuery', false);

mongoose.connect(uri)
  .then(() => console.log(' Connected to MongoDB!'))
  .catch(err => console.error(' Connection error:', err));

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    minlength: [3, 'Name must be at least 3 characters long'],
    trim: true
  },
  number: {
    type: String,
    required: [true, 'Phone number is required'],
    minlength: [8, 'Phone number must be at least 8 characters long'],
    trim: true
  }
});

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model('Person', personSchema);