import axios from "axios";

// const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

 const BACKEND_URL = 'http://localhost:5000/';




export const API_URL = `${BACKEND_URL}api/v1/breeds/`;

console.log(API_URL)

// create breed
// this will send the breeddata to the backend as part of the req.body
const  createBreed = async (breedData) => {
    const response = await axios.post(API_URL , breedData, {
        withCredentials: false,
    })
    return response.data
}
// get all breeds
const  getBreeds = async () => {
    const response = await axios.get(API_URL)
    return response.data
}

// delete breed with id
const deleteBreed = async(id) => {
    const response = await axios.delete(API_URL + id)
    return response.data
}
// edit breed
const editBreed = async(id,updatedData) => {
    const response = await axios.patch(API_URL + id, updatedData)
    return response.data
}

const breedService = {
    createBreed,
    getBreeds,
    deleteBreed,
    editBreed,
}

export default breedService
