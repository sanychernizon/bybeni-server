const express = require("express"),
  router = express.Router(),
  Order = require("../models/orderModel");

  router.get('/', (req, res) => {
    Order.find({}, (err, orders) => {
      res.send(orders);
    });
  })

  router.get('/paid', (req, res) => {
    Order.find({ status: 'paid' }, (err, orders) => {
      res.send(orders);
    });
  })

  router.get('/refused', (req, res) => {
    Order.find({ status: 'refused' }, (err, orders) => {
      res.send(orders);
    });
  })
  
module.exports = router;