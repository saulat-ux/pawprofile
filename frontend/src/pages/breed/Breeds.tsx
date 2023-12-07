// this page will fetch all the breed of dogs and list them in this page with one functionality that when user clicks on it it will show its details and user if has access can eidt it details
// and it will have a search query
import React from 'react'
import  { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RESET_BREED, getBreeds } from '../../redux/features/breed/breedSlice';



import Card from '../../components/card/Card'


export const Breeds =  () => {
  const {isLoading , isSuccess ,breed} = useSelector((state) => state.breed)
  const dispatch = useDispatch();

  const fetchData= async () => {
    await dispatch(getBreeds())
  }

  
  useEffect(() => {
   fetchData()
  },[])
  
  console.log(breed)
  
  return (
    <>
     {isLoading && <p>Loading...</p>}

    {isSuccess && breed && breed.length > 0 ? (
        <div className='bg-black grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3'>
          {breed.map((dog, index) => (
            <Card key={index} {...dog} />
          ))}
        </div>
      ) : (
        <p>No breed data available</p>
      )}
   </>
  
  )
}
