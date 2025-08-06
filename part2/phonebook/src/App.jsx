import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Services from './Services'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])          
  const [newName, setNewName] = useState('')           
  const [newPhone, setNewPhone] = useState('')         
  const [filter, setFilter] = useState('')  
  const [notification, setNotification] = useState(null)          
  const [notifType, setNotifType] = useState('success')
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')


  
  useEffect(() => {
    Services.getAll().then(res => {
      setPersons(res)
    })
  }, [])

  const handleNameChange = e => setNewName(e.target.value)
  const handlePhoneChange = e => setNewPhone(e.target.value)
  const handleFilterChange = e => setFilter(e.target.value)

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      Services
        .remove(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
          setNotification(`Deleted ${name}`)
          setNotifType('success')
          setTimeout(() => setNotification(null), 5000)
        })
        .catch(error => {
          setNotification(`Failed to delete ${name}. It might already have been removed from the server.`)
          setNotifType('error')
          setPersons(persons.filter(p => p.id !== id))
          setTimeout(() => setNotification(null), 5000)
        })
    }
  }

  const addPerson = (e) => {
    e.preventDefault()

    const existingPerson = persons.find(p => p.name.toLowerCase() === newName.toLowerCase())
    const newPerson = { name: newName, number: newPhone }

    if (existingPerson) {
      const confirmUpdate = window.confirm(
        `${newName} is already in the phonebook. Replace the old number with a new one?`
      )

      if (confirmUpdate) {
        Services
          .update(existingPerson.id, newPerson)
          .then(updatePerson => {
            setPersons(persons.map(p => p.id !== existingPerson.id ? p : updatePerson))
            setNewName('')
            setNewPhone('')
            setNotification(`Updated ${updatePerson.name}'s number`)
            setNotifType('success')
            setTimeout(() => setNotification(null), 5000)
          })
          .catch(error => {
            setNotification(`Information of ${newName} has already been removed from the server`)
            setNotifType('error')
            setPersons(persons.filter(p => p.id !== existingPerson.id))
            setTimeout(() => setNotification(null), 5000)
          })
      }

      return
    }

    Services
      .create(newPerson)
      .then(returnedPerson => {
        setPersons([...persons, returnedPerson])
        setNewName('')
        setNewPhone('')
        setNotification(`Added ${returnedPerson.name}`)
        setNotifType('success')
        setTimeout(() => setNotification(null), 5000)
      })
      .catch(error => {
        setNotification(`Failed to add ${newName}`)
        setNotifType('error')
        setTimeout(() => setNotification(null), 5000)
      })
  }

  const personsToShow = filter.trim()
    ? persons.filter(p =>
        p.name.toLowerCase().includes(filter.trim().toLowerCase())
      )
    : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} type={notifType} />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />

      <h3>Add a New Name & Number</h3>
      <PersonForm
        newName={newName}
        newPhone={newPhone}
        handleNameChange={handleNameChange}
        handlePhoneChange={handlePhoneChange}
        addPerson={addPerson}
      />

      <h3>Numbers</h3>
      <Persons persons={personsToShow} handleDelete={handleDelete} />
    </div>
  )
}

export default App
