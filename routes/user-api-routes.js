const db = require("../models");

module.exports = function(app) {

  app.get("/api/merchant/:id", (req, res) => {
    console.log(req.params.id)
    db.User.findOne({ _id: req.params.id }, function(err, merchant) {
      if (err) throw err;
      db.Product.find({ seller: req.params.id }, function(error, products) {
        if (error) throw error;
        res.json({
          merchant: merchant,
          products: products
        })
      })
    })
  });

  app.get("/api/userProfile", (req, res) => {
    const id = req.user._id;
    db.User.findOne({ _id: id }, function(err, user) {
      if (err) throw err;
      db.Product.find({ seller: id }, function(error, products) {
        if (error) throw error;
        res.json({
          user: user,
          products: products
        })
      })
    })
  });

  app.get("/api/editProfile", (req, res) => {
  });


};