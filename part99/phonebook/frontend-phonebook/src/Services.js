import axios from 'axios'

const baseUrl = import.meta.env.VITE_PHONEBOOK_URL;


// GET all persons
const getAll = () => 
  axios.get(baseUrl).then(response => response.data)

// POST a new person
const create = newPerson => 
  axios.post(baseUrl, newPerson).then(response => response.data)

// PUT (update) a person
const update = (id, updatedPerson) => 
  axios.put(`${baseUrl}/${id}`, updatedPerson).then(response => response.data)

const remove = id =>
  axios.delete(`${baseUrl}/${id}`).then(response => response.data)

// Export as default
export default { getAll, create, update, remove }



