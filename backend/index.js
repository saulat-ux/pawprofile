console.log("Hello World paw!!!");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const breedRoutes = require('./routes/breedRoutes')
const userRoutes = require('./routes/userRoutes')


// const errorHandler = require("./middleware/errorMiddleware");
const app = express()




// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));



// Enable CORS using middleware
app.use(cors({
    origin: "http://127.0.0.1:5173",
    credentials: true,
}));


// router
app.use("/api/v1/breeds", breedRoutes )
app.use("/api/v1/user", userRoutes )




app.get("/", (req,res) => {
    res.send("home page for paw..")
})

const Port  =  5000

// error middleware


// mongoose.connect(process.env.MONGO_URI)
//     .then(() => {
//         app.listen(Port, () => {
//             console.log(`server is running on port ${Port}`)
//         })
//     }).catch((error) => {
//         console.log(error)
//     })


    mongoose.connect('mongodb+srv://saulatzubair:rP5JXPOdbd7iIfsL@cluster0.iwf1rm0.mongodb.net/paw-pro?retryWrites=true&w=majority')
    .then(() => {
        app.listen(Port, () => {
            console.log(`server is running on port ${Port}`)
        })
    }).catch((error) => {
        console.log(error)
    })
