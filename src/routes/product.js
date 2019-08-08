const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductController")
const uploadCloud = require("../config/cloudinary");

router.get("/", ProductController.find);

router.post("/", ProductController.create);

router.post("/upload", uploadCloud.single("photo"), ProductController.sendProductImageUrl);

router.delete("/:id", ProductController.delete);

router.put("/:id", ProductController.update);

module.exports = router;