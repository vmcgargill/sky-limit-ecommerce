const db = require("../../models");
const upload = require("../../config/multer");
const fs = require('fs');
const path = require('path'); 
const router = require("express").Router();
const isAuthenticated = require("../../config/middleware/isAuthenticated");
const isProductOwner = require("../../config/middleware/isProductOwner")

router.get("/api/products", (req, res) => {
  db.Product.find({}, (err, product) => {
    if (err) {
      throw err;
    } else {
      res.json(product);
    }
  })
});

router.get("/api/searcProducts/:search", (req, res) => {
  const search = req.params.search;
  db.Product.find({
    $or: [
      {
        name: {
          $regex: new RegExp(search, "i")
        }
      }, {
        description: {
          $regex: new RegExp(search, "i")
        }
      }, {
        category: {
          $regex: new RegExp(search, "i")
        }
      }
    ]
  }, (err, products) => {
    if (err) throw err;
    res.json(products)
  })
});

router.get("/api/product/:id", (req, res) => {
  const id = req.params.id;
  db.Product.findOne({ _id: id }).populate("seller").exec().then(product => {
    console.log(product)
    if (product === null) {
      return res.json(404);
    } else {
      if (req.user) {
        const dbResponse = {
          product: product,
          signedin: true
        }
  
        db.Order.find({buyer: req.user._id, products: {$elemMatch: {productId: id}}}, (errorMsg, order) => {
          if (errorMsg) throw errorMsg;
          if (order.length === 0) {
            dbResponse.ordered = false
          } else if (order.length > 0) {
            dbResponse.ordered = true
          }
  
          db.User.findOne({ _id: req.user._id }, (err, user) => {
            if (err) throw err;
            const WishList = user.wishlist;
            if (WishList.indexOf(id) > -1) {
              dbResponse.wishlist = true
            } else {
              dbResponse.wishlist = false
            }
            const Cart = user.cart;
            if (Cart.indexOf(id) > -1) {
              dbResponse.cart = true
            } else {
              dbResponse.cart = false
            }
            res.json(dbResponse)
          })
        })
      } else {
        res.json({product: product, signedin: false})
      }
    }
  }).catch(() => {
    return res.json(404)
  })
});

router.get("/api/sellerProduct/:id", isAuthenticated, isProductOwner, (req, res) => {
  const id = req.params.id;
  db.Product.findById(id, (err, product) => {
    if (err) throw err;
    if (product) {
      res.json({product: product});
    } else {
      res.json(404)
    }
  })
})

router.get("/api/userWishlist", isAuthenticated, (req, res) => {
  const userId = req.user._id;
  db.User.findOne({ _id: userId }, (err, user) => {
    if (err) throw err;
    const WishList = user.wishlist;
    db.Product.find().where('_id').in(WishList).exec((error, products) => {
      if (error) throw err;
      res.json({products});
    });
  })
})

router.get("/api/userCart", isAuthenticated, (req, res) => {
  const userId = req.user._id;
  db.User.findOne({ _id: userId }, (err, user) => {
    if (err) throw err;
    const Cart = user.cart;
    db.Product.find().where('_id').in(Cart).exec((error, products) => {
      if (error) throw err;
      res.json({products});
    });
  })
})

router.post("/api/postProduct", isAuthenticated, upload.single("image"), (req, res) => {
  const product = new db.Product(req.body);
  product.assignSeller(req.user._id)
  if (req.file) {
    product.image = {
      data: fs.readFileSync(path.join(__dirname + '/../../upload/' + req.file.filename)), 
      contentType: req.file.mimetype
    }
  }
  db.Product.create(product, (err, created) => {
    if (err) throw err;
    if (req.file) {
      fs.unlinkSync(path.join(__dirname + '/../../upload/' + req.file.filename));
    }
    res.json(created)
  })
});

router.put("/api/editProduct/:id", isAuthenticated, isProductOwner, upload.single("image"), (req, res) => {
  const id = req.params.id;
  const product = req.body;
  if (req.file) {
    product.image = {
      data: fs.readFileSync(path.join(__dirname + '/../../upload/' + req.file.filename)), 
      contentType: req.file.mimetype
    }
  }
  db.Product.findByIdAndUpdate(id, {$set: product}, (err, updated) => {
    if (err) throw err;
    if (req.file) {
      fs.unlinkSync(path.join(__dirname + '/../../upload/' + req.file.filename));
    }
    res.json(updated)
  });
});

router.delete("/api/deleteProduct/:id", isAuthenticated, isProductOwner, (req, res) => {
  const id = req.params.id;
  db.Product.deleteOne({ _id: id }, (err, deleted) => {
    if (err) throw err;
    res.json(deleted)
  })
})

module.exports = router;