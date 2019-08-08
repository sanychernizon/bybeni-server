const express = require("express");
const router = express.Router();
const OrderController = require('../controllers/OrderController')

  router.get('/', OrderController.findAll)

  router.get('/paid', OrderController.findPaid)

  router.get('/refused', OrderController.findRefused)
  
module.exports = router;