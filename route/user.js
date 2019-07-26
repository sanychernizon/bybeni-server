const express = require("express"),
  router = express.Router(),
  User = require("../models/userModel");

router.get("/", (req, res) => {
  User.find({}, (err, user) => {
    res.send(user);
  });
});

router.post("/register", (req, res) => {
  User.find({ cpf: req.body.cpf }, (err, user) => {
    if(user){
      res.send('usuário já cadastrado')
    }
      let { name, lastName, email, password, cpf, street, number, adjunct, neighborhood, city, state, zip } = req.body
      new User({
        name: name,
        lastName: lastName,
        email: email,
        password: password,
        cpf: cpf,
        address: {
          street: street,
          number: number,
          adjunct: adjunct,
          city: city,
          state: state,
          neighborhood: neighborhood,
          zip: zip
        }
      }).save()
      .then(newUser => {
        console.log(newUser);
        res.send('Usuário cadastrado com sucesso!');
      });;
  });
});

module.exports = router;
