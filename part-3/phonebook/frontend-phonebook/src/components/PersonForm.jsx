const PersonForm = ({ newName, newPhone, handleNameChange, handlePhoneChange, addPerson }) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        Name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        Number: <input value={newPhone} onChange={handlePhoneChange} />
      </div>
      <div>
        <button type="submit" 
        disabled = {newName ===''}
        >Add</button>
      </div>
    </form>
  )
}

export default PersonForm
