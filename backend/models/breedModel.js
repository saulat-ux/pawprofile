const mongoose = require('mongoose')

const breedSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add a name"],
        trim: true,
    },
    breed: {
        type: String,
        // required: [true, "Please add a category"],
        trim: true,
    },
    color: {
        type: String,
        // required: [true, "Please add a color"],
        trim: true,
        default: "As seen"
    },
    description: {
        type: String,
        required: [true, "Please add a description"],
        trim: true,
    },
    
    imageURL: {
        type: String,
       
    },
    userID: {
        type: String,
        required: [true, "Id is required"]
    }


},
{
    timestamps:true,
}
)

const Breed = mongoose.model('Breed', breedSchema);

module.exports = Breed