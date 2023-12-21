// this page will have the list of all breeds of dogs where there will my some actions buttons to edit or remove the breed 
import  { useEffect, useState } from 'react'

import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import Popup from '../../components/popupform/Popup';
import EditForm from '../../components/popupform/editForm';
import { useDispatch, useSelector } from 'react-redux';
import { RESET_BREED, deleteBreed, getBreeds } from '../../redux/features/breed/breedSlice';
import { RESET_AUTH, getUser } from '../../redux/features/auth/authSlice';

const ListOfBreeds = () => {
  const [selectedDogId, setSelectedDogId] = useState(null);
  const [popupTrigger, setPopupTrigger] = useState(false)
  const [filteredBreeds, setFilteredBreeds] = useState([]);
  const [popupForm , setPopupForm] = useState(false)
  const {isLoading , isSuccess ,breed} = useSelector((state) => state.breed)
  const { user , Id} = useSelector((state) => state.auth)
  const dispatch = useDispatch();
 
useEffect(() => {

  const fetchData= async () => {
    await dispatch(getBreeds())
    await dispatch(getUser());
  } 
    fetchData()
   
}, [])
 

 useEffect(() => {
  if (isSuccess && breed && breed.length > 0) {
    const filteredData = breed.filter((dog) => dog.userID === Id);
    setFilteredBreeds(filteredData);
  }
}, [Id, breed, isSuccess]);
console.log(Id)
 

if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!isSuccess || !breed || breed.length === 0) {
    return <p>No breed data available</p>;
  }
  const handleDelete = async (id) => {
    try {
      await dispatch(deleteBreed(id))
      await dispatch(getBreeds());
      
    } catch (error) {
      console.log("error deleting the object", error)
    }
  }
  const handleEdit = (id) => {
    console.log(id)
    setSelectedDogId(id);
    setPopupForm(true);
  }
  const handlePopupClose = async () => {
    setPopupTrigger(false); // Close the popup
    setPopupForm(false)  // close the editform
    // Fetch updated breeds when the popup is closed
    await dispatch(getBreeds());
  };
  const updateBreedData = (updatedBreedData) => {
    // Use the updated data received from the Popup component
    console.log('Received updated breed data:', updatedBreedData);
    // Perform actions with the updated data if needed
    // For example, update the state or dispatch an action
  };
  updateBreedData()
  
  
  return (
    <div className="h-min-screen py-5 flex justify-center">
         <Popup trigger = {popupTrigger} onClose={handlePopupClose}>
         
            </Popup>
            <EditForm trigger={popupForm} dogId={selectedDogId}  onClose={handlePopupClose}/>

      <div className={` ${popupTrigger || popupForm ? 'hidden' :  'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'} `}>
        <div className="flex justify-between mt-2 my-2">
          <h1 className="text-4xl font-bold py-2">Dogs List</h1>
       
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setPopupTrigger(true)}>
            +Add new
          </button>
        </div>

      {isLoading && <p className='text-3xl text-bold'>Loading...</p>}
        <div className="border border-yellow-400 rounded-lg overflow-hidden p-6">
          <table className="min-w-full bg-white">
            {/* Table header */}
            <thead className="bg-gray-950 text-white">
              <tr>
                <th className="px-4 py-6">S/n</th>
                <th className="px-4 py-6">Name</th>
                <th className="px-4">Image</th>
                <th className="px-4">Description</th>
             
                <th className="px-4">Actions</th>
              </tr>
            </thead>

            {/* Table body */}
            {isSuccess && filteredBreeds && filteredBreeds.length > 0 ? (
                 <tbody className='border'>
                 {filteredBreeds?.map((dog, index) => (
                   <tr key={index} className="text-center border">
                     <td className="px-4 py-9">{index + 1}</td>
                     <td className="px-4 py-9">{dog.name}</td>
                     <td className="px-4">
                       <img src={dog.imageURL} width={100} alt="" />
                     </td>
                     <td className="px-4">{dog.description}</td>
                     <td className="px-4">
                       <div className="flex gap-6">
                         <button className='text-3xl' onClick={()=> handleEdit(dog._id)}><CiEdit/></button>
                         <button className='text-3xl color-red' onClick={() => handleDelete(dog._id)}><MdDeleteForever/></button>
                       </div>
                     </td>
                   </tr>
                 ))}
               </tbody>
            ) : (
              <p>No breed data available</p>
            )}
           
          </table>
        </div>
      </div>
    </div>
  );
};

export default ListOfBreeds;
