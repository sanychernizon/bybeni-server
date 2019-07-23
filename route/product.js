const Product = require("../models/productModel");
const express = require("express");
const uploadCloud = require('../config/cloudinary');
const router = express.Router();

router.get("/", (req, res, next) => {
  if (req.query.category) {
    Product.find({ category: req.query.category }, (err, products) => {
      res.send(products);
    });
  } else if (req.query.id) {
    Product.find({ _id: req.query.id }, (err, product) => {
      res.send(product);
    });
  } else if (req.query.isFeatured) {
    Product.find({ isFeatured: req.query.isFeatured }, (err, products) => {
      res.send(products);
    });
  } else {
    Product.find({}, (err, products) => {
      res.send(products);
    });
  }
});

router.post("/upload", uploadCloud.array('photos', 12), (req, res, next) => {
  console.log(req.files[0].url)
  res.json(req.files[0].url)
})

router.post("/", (req, res, next) => {
  console.log(req.body)
  new Product({
    name: req.body.name,
    price: req.body.price,
    category: req.body.category,
    availableSizes: req.body.availableSizes,
    imageURL: [],
    description: req.body.description,
    isFeatured: req.body.isFeatured
  })
    .save()
    .then(newProduct => {
      console.log(newProduct);
    });
});

router.delete("/:id", (req, res, next) => {
  Product.deleteOne({ _id: req.params.id }, err => {
    if (err) {
      console.log(err);
    }
  });
});

router.put("/:id", (req, res, next) => {
  const filter = { _id: req.params.id };
  const update = req.body;
  Product.findOneAndUpdate(filter, update, {
    new: true
  }).then((product) => {
    console.log(product)
  })
});

module.exports = router;
