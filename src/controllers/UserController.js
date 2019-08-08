const User = require('../models/UserModel');

module.exports = {

  find(req, res){
    User.find({}, (err, user) => {
      res.send(user);
    });
  },

  create(req, res) {
    User.findOne({ email: req.body.email }, (err, user) => {
      if (user) {
        res.json({alreadyRegister: true});
      } else {
        let {name,lastName,email,password,cpf,street,number,adjunct,neighborhood,city,state,zip} = req.body;
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
        })
          .save()
          .then(newUser => {
            res.json({isRegister: true});
          }); 
      }
    });
  },

  login(req, res){
    User.findOne({ email: req.body.userEmail }, (err, user) => {
      if(user.password === req.body.userPassword) {
        res.json(user)
      } else {
        let data = {incorrectPassword: true}
        res.statusMessage = 'incorrect'
        res.json(data)
      }
    })
  }
}