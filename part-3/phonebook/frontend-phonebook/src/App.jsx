// App.jsx
import { useState, useEffect } from 'react';
import phonebookService from './services/phonebookService';
import Filter from './Filter';
import PersonForm from './PersonForm';
import Persons from './Persons';

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterPerson, setFilterPerson] = useState('');

  // Normalize _id to id when fetching data
  useEffect(() => {
    phonebookService
      .getAll()
      .then(res => {
        const normalized = res.data.map(p => ({ ...p, id: p.id || p._id }));
        setPersons(normalized);
      })
      .catch(err => {
        console.error('Failed to load contacts:', err);
      });
  }, []);

  // Input handlers
  const handleNameChange = e => setNewName(e.target.value.trim());
  const handleNumberChange = e => setNewNumber(e.target.value);
  const handleFilterChange = e => setFilterPerson(e.target.value);

  // Add or update person
  const handleSubmit = e => {
    e.preventDefault();
    const existingPerson = persons.find(p => p.name === newName);

    if (existingPerson) {
      if (window.confirm(`${newName} is already in phonebook. Replace the old number?`)) {
        const updatedPerson = { ...existingPerson, number: newNumber };
        phonebookService
          .update(existingPerson.id, updatedPerson)
          .then(res => {
            const normalized = { ...res.data, id: res.data.id || res.data._id };
            setPersons(persons.map(p => (p.id !== existingPerson.id ? p : normalized)));
            setNewName('');
            setNewNumber('');
          })
          .catch(err => {
            alert(`Failed to update ${newName}. It may have been removed.`);
            console.error(err);
          });
      }
      return;
    }

    // Add new person
    const newPerson = { name: newName, number: newNumber };
    phonebookService
      .postAll(newPerson)
      .then(res => {
        const normalized = { ...res.data, id: res.data.id || res.data._id };
        setPersons([...persons, normalized]);
        setNewName('');
        setNewNumber('');
      })
      .catch(error =>console.log(error.response.data.error));
  };

  // Delete person
  const handleDelete = id => {
    console.log("Deleting ID:", id);
    const person = persons.find(p => p.id === id);
    if (!person) return;

    if (window.confirm(`Delete ${person.name}?`)) {
      phonebookService
        .deleteNum(person.id)
        .then(() => setPersons(persons.filter(p => p.id !== person.id)))
        .catch(err => {
          alert(`Failed to delete ${person.name}. Maybe they were already removed.`);
          console.error(err);
        });
    }
  };

  // Filtered list
  const filteredPersons = persons.filter(p =>
    (p.name ?? '').toLowerCase().includes((filterPerson ?? '').toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filter={filterPerson} handleFilterChange={handleFilterChange} />

      <h3>Add a new</h3>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        handleSubmit={handleSubmit}
      />

      <h3>Numbers</h3>
      <Persons persons={filteredPersons} handleDelete={handleDelete} />
    </div>
  );
}

export default App;