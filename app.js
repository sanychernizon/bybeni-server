require('dotenv').config();
const express = require('express'),
  app = express(),
  mongoose = require('mongoose'),
  bcrypt = require('bcryptjs'),
  bodyParser = require('body-parser'),
  cors = require('cors');

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
mongoose.set('useFindAndModify', false)

// CONNECT MONGODB
mongoose.connect(process.env.MONGOURI, {useNewUrlParser: true})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => { console.log(err) })

// ROUTES
const product = require('./route/product'),
  user = require('./route/user')

app.use('/api/product', product)
app.use('/api/user', user)

// SERVER
const port = process.env.PORT || 3004;
app.listen(port, (err) => {
  if(err){
    console.log(err)
  }
  console.log('App rodando na porta ' + port)
})