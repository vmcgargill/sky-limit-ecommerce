const db = require("../models");
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {

  app.get("/api/merchant/:id", (req, res) => {
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

  app.get("/api/merchantProducts", (req, res) => {
    const id = req.user._id;
    db.Product.find({ seller: id }, function(err, products) {
      if (err) throw err;
      res.json({
        products: products
      })
    })
  })

  app.post("/api/wishList/:id", (req, res) => {
    const id = req.params.id;
    const userId = req.user._id;
    db.User.findByIdAndUpdate({
      _id: userId
    }, {
      $push: { wishlist: id }
    }, (err, updated) => {
      if (err) throw err;
      console.log(updated)
      res.json({message: "Success!"})
    })
  });

  app.put("/api/removeWishList/:id", (req, res) => {
    const id = req.params.id;
    const userId = req.user._id;
    db.User.findByIdAndUpdate({
      _id: userId
    }, {
      $pull: { wishlist: id }
    }, (err, updated) => {
      if (err) throw err;
      console.log(updated)
      res.json({message: "Success!"})
    })
  });

  app.post("/api/addCart/:id", (req, res) => {
    const id = req.params.id;
    const userId = req.user._id;
    db.User.findByIdAndUpdate({
      _id: userId
    }, {
      $push: { cart: id }
    }, (err, updated) => {
      if (err) throw err;
      console.log(updated)
      res.json({message: "Success!"})
    })
  });

  app.put("/api/removeCart/:id", (req, res) => {
    const id = req.params.id;
    const userId = req.user._id;
    db.User.findByIdAndUpdate({
      _id: userId
    }, {
      $pull: { cart: id }
    }, (err, updated) => {
      if (err) throw err;
      console.log(updated)
      res.json({message: "Success!"})
    })
  });


};