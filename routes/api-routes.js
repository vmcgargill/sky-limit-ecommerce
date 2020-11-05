const mongojs = require("mongojs");
const db = require("../models");
const passport = require("../config/passport");

module.exports = function(app) {

  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    res.json({status: 200})
  });

  app.post("/api/signup", function (req, res) {
    db.User.create(req.body, function(err, user) {
      res.json({})
    })
  });

  app.get("/api/logout", function (req, res) {
    req.logout();
    res.json({message: false})
  });

  app.get("/api/user_data", function (req, res) {
    if (req.user) {
      res.json({message: true})
    } else {
      res.json({message: false})
    }
  });

  app.get("/api/products", (req, res) => {
    db.Product.find({}, (err, product) => {
      if (err) {
        throw err;
      } else {
        res.json(product);
      }
    })
  });

  app.get("/api/product/:id", (req, res) => {
    const id = req.params.id;

    db.Product.findOne({ _id: id }, (err, product) => {
      if (err) {
        throw err;
      } else {
        res.json(product);
      }
    })
  });

  app.post("/api/postProduct", (req, res) => {
    console.log("test")
    db.Product.create(req.body, function(err, product) {
      // res.json(product)
      if (err) throw err;
      console.log(product)
    })
  });
  
};