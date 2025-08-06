const Filter = ({ filter, handleFilterChange }) => (
  <div>
    <label>
Filter shown with:
<input value={filter} onChange={handleFilterChange} />
    </label>
  </div>
)

export default Filter
