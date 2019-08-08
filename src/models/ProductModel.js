const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const productSchema = new Schema({
  name: String,
  price: String,
  category: String,
  availableSizes: Array,
  description: String,
  imageURL: Array,
  isFeatured: Boolean
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product