
function PersonForm({ newName, newNumber, handleNameChange, handleNumberChange, handleSubmit,handleDelete }) {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        Name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        Number: <input value={newNumber} onChange={handleNumberChange} /> 
      </div>
      <button 
      disabled = {newName===''}
      type="submit">Add</button>
    </form>
  )
}

export default PersonForm
