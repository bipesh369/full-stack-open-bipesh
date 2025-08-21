import axios from "axios";


const baseUrl = import.meta.env.VITE_PHONEBOOK_API_URL; 



const getAll = () => {
    return axios.get(baseUrl);
};


const postAll = (newObj) => {
    return axios.post(baseUrl, newObj);
};

const deleteNum = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

const update = (id, updatedObj) => {
    return axios.put(`${baseUrl}/${id}`, updatedObj);
};

export default {
    getAll,
    postAll,
    deleteNum,
    update
};