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

router.get("/api/merchant/:id", (req, res) => {
  const id = req.params.id;
  db.User.findOne({ _id: id }, (err, merchant) => {
    if (err) throw err;
    db.Product.find({ seller: id }).populate("reviews").exec().then(products => {
      db.Review.find({ seller: id }, (errMsg, reviews) => {
        if (errMsg) throw errMsg;
        let averageRating = null;
        if (reviews.length > 0) {
          averageRating = reviews.map(review => review.rating).reduce((x, y) => x + y, 0) / reviews.length;
        }
        return res.json({
          merchant: merchant,
          products: products,
          rating: averageRating
        })
      })
    }).catch(() => {
      return res.json(404);
    })
  }).catch(() => {
    return res.json(404);
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

router.get("/api/userAddresses", isAuthenticated, (req, res) => {
  const id = req.user._id
  db.User.findOne({ _id: id }, 'address', (err, userAddresses) => {
    if (err) throw err;
    res.json(userAddresses);
  })
})

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

router.post("/api/creatAddress", isAuthenticated, (req, res) => {
  const id = req.user._id;
  db.User.findByIdAndUpdate(id, {
    $addToSet: { address: req.body }
  }, (err, updated) => {
    if (err) throw err;
    if (updated) {
      res.json({message: "Success!"})
    }
  })
})

router.put("/api/updateAddress/:id", isAuthenticated, (req, res) => {
  const id = req.params.id;
  db.User.updateOne({ _id: req.user._id, address: { $elemMatch: {_id: id}} }, {
    $set: req.body
  }, (err, updated) => {
    if (err) throw err;
    if (updated) {
      res.json({message: "Success!"})
    }
  })
})

router.put("/api/removeAddress/:id", isAuthenticated, (req, res) => {
  const id = req.params.id;
  db.User.findByIdAndUpdate(req.user._id, {
    $pull: { address: {
      _id: id
    }}
  }, (err, user) => {
    if (err) throw err;
    if (user) {
      res.json({message: "Success!"})
    }
  })
})

router.put("/api/setDefaultAddress/:id", isAuthenticated, (req, res) => {
  const id = req.params.id;

  db.User.updateOne({ _id: req.user._id, address: { $elemMatch: {default: true}} }, {
    $set: {
      "address.$.default": false
    }
  }, (error, defaultUpdated) => {
    if (error) throw error;
    if (defaultUpdated) {
      db.User.updateOne({ _id: req.user._id, address: { $elemMatch: {_id: id}} }, {
        $set: {
          "address.$.default": true
        }
      }, (err, user) => {
        if (err) throw err;
        if (user) {
          res.json({message: "Success!"})
        }
      })
    }
  })


})

router.post("/api/wishList/:id", isAuthenticated, (req, res) => {
  const id = req.params.id;
  const userId = req.user._id;
  db.User.findByIdAndUpdate(userId, {
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
  db.User.findByIdAndUpdate(userId, {
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
  db.User.findByIdAndUpdate(userId, {
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
  db.User.findByIdAndUpdate(userId, {
    $pull: { cart: id }
  }, (err, updated) => {
    if (err) throw err;
    if (updated) {
      res.json({message: "Success!"})
    }
  })
});

module.exports = router;