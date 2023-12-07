const express = require("express");
const { createBreed,getBreed,getBreeds,deleteBreeds, updateBreed } = require("../controllers/breedController");
const router = express.Router();

// router.post("/", protect, adminOnly,createProduct);
router.post("/",createBreed);

router.get("/",getBreeds);
router.get("/:id",getBreed);
router.delete("/:id",deleteBreeds);

router.patch("/:id",updateBreed);
// router.post("/:id", protect, adminOnly,deleteProducts);
// router.patch("/:id", protect, adminOnly,updateProduct);


module.exports =router;