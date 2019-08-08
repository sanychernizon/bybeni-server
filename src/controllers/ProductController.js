const Product = require("../models/ProductModel");

module.exports = {
  find(req, res) {
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
  },

  create(req, res){
    new Product({
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
      availableSizes: req.body.availableSizes,
      imageURL: req.body.imageURL,
      description: req.body.description,
      isFeatured: req.body.isFeatured
    })
      .save()
      .then(newProduct => {
        res.status(200).send('salvo');
      });
  },

  delete(req, res) {
    Product.deleteOne({ _id: req.params.id }, err => {
      if (err) {
        console.log(err);
      }
      res.status(200).send('deletado');
    });
  },

  update(req, res) {
    const filter = { _id: req.params.id };
    const update = req.body;
    Product.findOneAndUpdate(filter, update, {
      new: true
    }).then(product => {
      res.status(200).send('atualizado');    
    });
  },

  sendProductImageUrl(req, res){
    res.json(req.file.url);
  }
}