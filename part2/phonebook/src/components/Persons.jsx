const Persons = ({ persons, handleDelete }) => {
  if (!persons || persons.length === 0) {
    return <p>No contacts found.</p>
  }

  return (
    <ul>
      {persons.map(person => (
        <li key={person.id}>
          {person.name}: {person.number}
          <button onClick={() => handleDelete(person.id, person.name)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  )
}

export default Persons
