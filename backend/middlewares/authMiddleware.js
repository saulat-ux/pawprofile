const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protect = expressAsyncHandler(async(req, res, next) => {
    try {
            const token = req.cookies.token
            console.log(req.cookies)
            if(!token){
                res.status(401)
                throw new Error("not authorized, please login")
            }
            // vairfy the token
            // const verified = jwt.verify(token, process.env.JWT_SECRET)
            const verified = jwt.verify(token, '123123')

            // get user id from token 
            const user = await User.findById(verified.id).select("-password")
            if(!user){
                res.status(401)
                throw new Error("user not found")
            }else{
                req.user = user
                next()
            }


    } catch (error) {
        res.status(401)
        throw new Error("not authorized, please login")
    }
})

// Admin only
const adminOnly = (req, res, next) => {
    if(req.user && req.user.role === "admin"){
        next()
    }else {
        res.status(401)
        throw new Error("Not authorized as an Admin.")
    }
}

module.exports = {
    protect,
    adminOnly,
}