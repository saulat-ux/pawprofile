import React from 'react'
import {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RESET_BREED,createBreed } from '../../redux/features/breed/breedSlice';
import { Link, useNavigate } from 'react-router-dom';


const Popup = (props) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {isLoading , isSuccess ,breed} = useSelector((state) => state.breed)

  const [name, setName] = useState('')
  const [imageURL, setImageURL] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit =  async () => {
    // e.preventDefault();
    console.log(name,imageURL,description)
    await dispatch(createBreed({ name, imageURL, description }))
    navigate("/breedlist")
  }

  


  return (props.trigger) ? (
  
        
        <div className="bg-yellow-200 p-8">
      <div className="max-w-md mx-auto bg-white rounded p-6 shadow-md">
        <h2 className="text-2xl mb-4 text-black">Add your Breed</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-black font-bold mb-2">Name</label>
            <input onChange={(e) =>setName(e.target.value) } type="text" id="name" name="name" className="border-2 rounded-md px-4 py-2 w-full" />
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="block text-black font-bold mb-2">Image URL</label>
            <input onChange={(e) =>setImageURL(e.target.value) } type="text" id="image" name="image" className="border-2 rounded-md px-4 py-2 w-full" />
          </div>
          <div className="mb-4">
            <label htmlFor="lifeExpectancy" className="block text-black font-bold mb-2">Description</label>
            <input onChange={(e) =>setDescription(e.target.value) } type="string" id="lifeExpectancy" name="lifeExpectancy" className="border-2 rounded-md px-4 py-2 w-full" />
          </div>
          <button type="submit" className="bg-black text-white py-2 px-4 rounded-md">Add</button>
         

        </form>
      </div>
    </div>
   
  ) : "";
}

export default Popup