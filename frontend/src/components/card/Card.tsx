import React from 'react'

const Card = ({name,imageURL,description}) => {
  return (
    <div className=" rounded overflow-hidden shadow-lg text-center py-5 ">
      <div className="px-6 py-9">
      <img className="w-full  object-cover object-center border-4 border-yellow-400" src={imageURL} alt='dog breed' />
        <div className="font-bold text-2xl mb-2 text-yellow-400" >Name: <span>{name}</span></div>
        <p className="text-yellow-400 text-xl">BreedLife: <span>{description}</span></p>
      </div>
     
     
    </div>
  )
}

export default Card