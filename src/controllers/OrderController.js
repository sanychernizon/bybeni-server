const Order = require('../models/OrderModel')

module.exports = {
  
  findAll(req, res){
    Order.find({}, (err, orders) => {
      res.send(orders);
    });
  },

  findPaid(req, res){
    Order.find({ status: 'paid' }, (err, orders) => {
      res.send(orders);
    });
  },

  findRefused(req, res){
    Order.find({ status: 'refused' }, (err, orders) => {
      res.send(orders);
    });
  }

}