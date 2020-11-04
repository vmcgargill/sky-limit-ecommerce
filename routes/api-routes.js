const mongojs = require("mongojs");
const db = require("../models");
const passport = require("../config/passport");

module.exports = function(app) {

  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    res.json(req.user);
  });

  app.post("/api/signup", function (req, res) {
    // db.User.create(req.body).then(function (respones) {
    //   // res.redirect(307, "/api/login");
    //   console.log(respones)

    // }).catch(function (err) {
    //   // res.status(401).json(err);
    //   console.log(err)
    // });

    db.User.create(req.body).then(newUser => {
      res.json(newUser);
    });
  });

  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
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
  
};