const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

// const generateToken = (id) => {
//     return jwt.sign({id}, process.env.JWT_SECRET , {
//         expiresIn: "1d"
//     })
// }

const generateToken = (id) => {
    return jwt.sign({id}, '123123' , {
        expiresIn: "1d"
    })
}

// register user
const registerUser = asyncHandler(async(req, res) => {
    const {name ,email, password} = req.body;
    console.log(req.body)
    // validate that request
    if(!name || !email || !password){
        res.status(400)
        throw new Error("Please fill the required fields")
    }
    if(password.length < 6){
        res.status(400);
        throw new Error("password must be greater than 6 characters")
    }
    // check if user exists 
    const userExists = await User.findOne({ email })
    if(userExists){
        res.status(400)
        throw new Error("Email has already been registered")
    }

    // creater new user
    const user = await User.create({
        name,email, password
    })

    // generate token
    const token = generateToken(user._id)
    // sending token to the frontend
    if(user){
        const {_id, name, email,role} = user
        res.cookie("token", token, {
            path:"/",
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 86400),
            secure: true,
            sameSite: 'None',
        })
        // send user data
        res.status(201).json({
            _id, name, email, token,role
        })
    }else{
        res.status(400)
        throw new Error("Invalid user data")
    }

    res.send("register user...")
})

// login user
    const loginUser =asyncHandler( async( req, res ) => {
        const {email, password} = req.body;
        // validate request
        if(!email || !password){
            res.status(400);
            throw new Error("Please add email and password")
        }
        // check if user exists
        const user = await User.findOne({ email });
        if(!user){
            res.status(400)
            throw new Error("user does not exists")
        }

        // check if password is correct
        const passwordIsCorrect = await bcrypt.compare(password , user.password)
        // generate token
        const token = generateToken(user._id);


        if(user && passwordIsCorrect){
            const newUser = await User.findOne({email}).select("-password")
            res.cookie("token" , token, {
                path:"/",
                httpOnly: true,
                expires: new Date(Date.now() + 1000 * 86400),
                secure: true,
                sameSite: 'None',
            })
            // send data
            res.status(201).json({newUser, token});
            console.log(req.cookies)
             
        } else{
            res.status(400);
            throw new Error("Invalid email or password")
        }

        
    })

// logout user
const logoutUser = asyncHandler( async(req, res) => {
    res.cookie("token", "",{
        path:"/",
        httpOnly:true,
        expires:new Date(0),
        secure: true,
        sameSite: 'None',
    })
    res.status(200).json({message: "Successfully logout"})
})


// get login status
const getLoginStatus = asyncHandler (async(req, res) => {
    console.log(req.cookies)
    const token = req.cookies.token;
    console.log(req.cookies)
    if(!token){
     return res.json(false)
     // return here so the application stops
     
 }
         // vairfy the token
         // const verified = jwt.verify(token, process.env.JWT_SECRET)
         const verified = jwt.verify(token, '123123')
      
         if(verified){
             res.json(true)
         }else{
              res.json(false)
         }
 })
// getuser
    const getUser = asyncHandler(async(req, res) => {

       const user = await User.findById(req.user._id).select("-password")
       if(user){
        res.status(200).json(user)
        
       }else{
        res.status(400)
        throw new Error("user not found")
       }
    });



// update user 
    const updateUser = asyncHandler(async(req, res) => {
        const user = await User.findById(req.user._id)
        if(user){
            const {name , phone, address} = user
            user.name = req.body.name || name;
            user.phone = req.body.phone || phone;
            user.address = req.body.address || address;

            const updatedUser = await user.save()
            res.status(200).json(updatedUser)

        }else{
            res.status(404)
            throw new Error("user not found")
        }
    })
    // update photo
    const updatePhoto = asyncHandler(async(req, res) => {
       const { photo } = req.body;
       const user = await User.findById(req.user._id)
       user.photo = photo;
       const updatedUser = await user.save();
        res.status(200).json(updatedUser)
    })


module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getUser,
    getLoginStatus,
    updateUser,
    updatePhoto,
}