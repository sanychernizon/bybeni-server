const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const orderSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  status: String,
  totalPrice: String,
  idTransaction: String,
  installments: String,
}, { timestamps: {createdAt: 'created_at', updatedAt: 'update_at'}})

const Order = mongoose.model('Order', orderSchema)

module.exports = Order