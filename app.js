require("dotenv").config();
const express = require("express"),
  app = express(),
  mongoose = require("mongoose"),
  bcrypt = require("bcryptjs"),
  bodyParser = require("body-parser"),
  cors = require("cors"),
  session = require("express-session");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
mongoose.set("useFindAndModify", false);

// SESSION
app.use(
  session({
    name: process.env.SESS_NAME,
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESS_SECRET
  })
);

// CONNECT MONGODB
mongoose
  .connect(process.env.MONGOURI, { useNewUrlParser: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => {
    console.log(err);
  });

// ROUTES
const product = require("./route/product"),
  user = require("./route/user"),
  checkout = require("./route/checkout"),
  order = require("./route/order")

app.use("/api/product", product);
app.use("/api/user", user);
app.use("/api/checkout", checkout);
app.use("/api/order", order);

// AUTH
app.post("/api/auth", (req, res, next) => {
  // Fazer uma rota para autenticar a sessao
  // let sessionID = req.body.sessionID
  // console.log(sessionID, req.sessionID)
  // if(sessionID === req.sessionID){
  //   res.json({userIsLoged: true})
  // } else {
  //   res.json({userIsLoged: false})
  // }
});

// SERVER
const port = process.env.PORT || 3004;
app.listen(port, err => {
  if (err) {
    console.log(err);
  }
  console.log("App rodando na porta " + port);
});
