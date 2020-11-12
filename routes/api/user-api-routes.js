const db = require("../../models");
const router = require("express").Router();
const isAuthenticated = require("../../config/middleware/isAuthenticated");

router.get("/api/userProfile", isAuthenticated, (req, res) => {
  const id = req.user._id;
  db.User.findOne({ _id: id }, (err, user) => {
    if (err) throw err;
    db.Product.find({ seller: id }, (error, products) => {
      if (error) throw error;
      res.json({
        user: user,
        products: products
      })
    })
  })
});

router.put("/api/updateUser", isAuthenticated, (req, res) => {
  const id = req.user._id;
  const data = req.body;
  db.User.findByIdAndUpdate(id, {$set: data}, (err, user) => {
    if (err) throw err;
    res.json({message: "Success!"})
  })
})

router.put("/api/updatePassword", isAuthenticated, (req, res) => {
  const id = req.user._id;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;
  db.User.findOne({_id: id}, (err, user) => {
    if (err) throw err;
    user.comparePassword(oldPassword, (error, match) => {
      if (error) throw error;
      if (!match) {
        res.json(401, {error: "Wrong password"})
      } else {
        db.User.findByIdAndUpdate(id, {$set: {password: newPassword}}, (errorMsg, resUser) => {
          if (errorMsg) throw errorMsg;
          res.json(200, {message: "Password Changed"})
        })
      }
    })
  })
})

router.get("/api/merchant/:id", (req, res) => {
  db.User.findOne({ _id: req.params.id }, (err, merchant) => {
    if (err) throw err;
    db.Product.find({ seller: req.params.id }, (error, products) => {
      if (error) throw error;
      res.json({
        merchant: merchant,
        products: products
      })
    })
  })
});

router.get("/api/merchantProducts", isAuthenticated, (req, res) => {
  const id = req.user._id;
  db.Product.find({ seller: id }, (err, products) => {
    if (err) throw err;
    res.json({
      products: products
    })
  })
})

router.post("/api/addPaymentMethod", isAuthenticated, (req, res) => {
  const card = req.body;
  console.log(card)
  const id = req.user._id;
  db.User.findByIdAndUpdate(id, {
    $addToSet: { payment: card }
  }, (err, updated) => {
    if (err) throw err;
    console.log(updated)
    if (updated) {
      res.json({message: "Success!"})
    }
  })

})

router.post("/api/wishList/:id", isAuthenticated, (req, res) => {
  const id = req.params.id;
  const userId = req.user._id;
  db.User.findByIdAndUpdate({
    _id: userId
  }, {
    $addToSet: { wishlist: id }
  }, (err, updated) => {
    if (err) throw err;
    if (updated) {
      res.json({message: "Success!"})
    }
  })
});

router.put("/api/removeWishList/:id", isAuthenticated, (req, res) => {
  const id = req.params.id;
  const userId = req.user._id;
  db.User.findByIdAndUpdate({
    _id: userId
  }, {
    $pull: { wishlist: id }
  }, (err, updated) => {
    if (err) throw err;
    if (updated) {
      res.json({message: "Success!"})
    }
  })
});

router.post("/api/addCart/:id", isAuthenticated, (req, res) => {
  const id = req.params.id;
  const userId = req.user._id;
  db.User.findByIdAndUpdate({
    _id: userId
  }, {
    $addToSet: { cart: id }
  }, (err, updated) => {
    if (err) throw err;
    if (updated) {
      res.json({message: "Success!"})
    }
  })
});

router.put("/api/removeCart/:id", isAuthenticated, (req, res) => {
  const id = req.params.id;
  const userId = req.user._id;
  db.User.findByIdAndUpdate({
    _id: userId
  }, {
    $pull: { cart: id }
  }, (err, updated) => {
    if (err) throw err;
    if (updated) {
      res.json({message: "Success!"})
    }
  })
});

module.exports = router;