const asyncHandler =require("express-async-handler");
const Breed = require("../models/breedModel");

const createBreed = asyncHandler(async(req, res) => {
   const {
    name,
    description,
    imageURL,
    color,

   } = req.body

   if(!name ||!description ){
    res.status(400)
    throw new Error("Please fill in all the fields")
   }

//    create breed
const breed = await Breed.create({
    name,
    description, 
    imageURL,
    color,
})

res.status(201).json(breed)
})

// get breeds
    const getBreeds = asyncHandler(async(req, res) => {
       const breeds = await Breed.find().sort("-createdAt")
       res.status(200).json(breeds)
    })


    // get single breed
    const getBreed = asyncHandler(async(req, res) => {
        const breed = await Breed.findById(req.params.id)
        if(!breed){
            throw new Error("breed not found")
        }
        res.status(201).json(breed)
     })

    //  Delete breeds
    const deleteBreeds = asyncHandler(async(req, res) => {
        const breed = await Breed.findById(req.params.id)
        if(!breed){
            res.status(404);
            throw new Error("breed not found")
        }
        await Breed.findByIdAndDelete(req.params.id)
        res.status(200).json({message:"breed is deleted"})
     })
// update breed
     const  updateBreed = asyncHandler(async(req, res) => {
        const {
            name,   
            description,
            imageURL,
            color,
           } = req.body
           const breed = await Breed.findById(req.params.id)
           if(!breed){
            res.status(404);
            throw new Error("breed not found")
        }
        // update breed
        const updatedBreed = await Breed.findByIdAndUpdate({
            
          _id:  req.params.id},
          {
            name, 
            description,
            imageURL,
            color,
          },
          {
            new: true,
            runValidators: true,
          }
          
          )
          res.status(200).json(updatedBreed)

     })

module.exports= {
    createBreed,
    getBreeds,
    getBreed,
    deleteBreeds,
    updateBreed,
}