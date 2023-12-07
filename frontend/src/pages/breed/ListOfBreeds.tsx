// this page will have the list of all breeds of dogs where there will my some actions buttons to edit or remove the breed 
import  { useEffect, useState } from 'react'

import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import Popup from '../../components/popupform/Popup';
import EditForm from '../../components/popupform/editForm';
import { useDispatch, useSelector } from 'react-redux';
import { RESET_BREED, deleteBreed, getBreeds } from '../../redux/features/breed/breedSlice';

const ListOfBreeds = () => {
  const [selectedDogId, setSelectedDogId] = useState(null);

  const {isLoading , isSuccess ,breed} = useSelector((state) => state.breed)
  const dispatch = useDispatch();

  const fetchData= async () => {
    await dispatch(getBreeds())
  }

  
  useEffect(() => {
   fetchData()
  },[])

  console.log(breed)

  const handleDelete = async (id) => {
    console.log(id)
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
  

  const [popupTrigger, setPopupTrigger] = useState(false)
  const [popupForm , setPopupForm] = useState(false)
  return (
    <div className="h-min-screen py-5 flex justify-center">
         <Popup trigger = {popupTrigger}>
         
            </Popup>
            <EditForm trigger={popupForm} dogId={selectedDogId} />

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
            {isSuccess && breed && breed.length > 0 ? (
                 <tbody className='border'>
                 {breed?.map((dog, index) => (
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
