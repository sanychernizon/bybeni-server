const express = require("express");
const router = express.Router();
const UserController = require('../controllers/UserController')
const User = require("../models/UserModel");

router.get("/", UserController.find);

router.post("/register", UserController.create);

router.post("/login", UserController.login)

module.exports = router;
