console.log("Hello World paw!!!");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const breedRoutes = require('./routes/breedRoutes')


// const errorHandler = require("./middleware/errorMiddleware");
const app = express()
app.use((req, res, next) => {
    // Handle preflight request
    if (req.method === 'OPTIONS') {
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      res.setHeader('Access-Control-Allow-Credentials', 'true');
      res.status(200).end();
      return;
    }
    next();
  });



// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));

app.use(
    cors({
        origin: ["http://localhost:5173"],
        credentials: true,
        optionsSuccessStatus: 200
    
    })
)




// router
app.use("/api/v1/breeds", breedRoutes )




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
