const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  lastName: String,
  email: String,
  password: String,
  cpf: String,
  address: {
    street: String,
    number: String,
    adjunct: String,
    city: String,
    state: String,
    neighborhood: String,
    zip: String
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
