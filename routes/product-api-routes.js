const db = require("../models");
const upload = require("../config/multer");
const fs = require('fs');
const path = require('path'); 

module.exports = function(app) {

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
    db.Product.findOne({ _id: id }).populate("seller").exec().then(product => {
      if (req.user) {
        db.User.findOne({ _id: req.user._id }, (err, user) => {
          if (err) throw err;
          const WishList = user.wishlist;
          const dbResponse = {
            product: product,
            signedin: true
          }
          if (WishList.indexOf(id) > -1) {
            dbResponse.wishlist = true
          } else {
            dbResponse.wishlist = false
          }
          res.json(dbResponse)
        })
      } else {
        res.json({product: product, signedin: false})
      }
    })
  });

  app.get("/api/productDetails/:id", (req, res) => {
    const id = req.params.id;
    db.Product.findOne({ _id: id }, (err, product) => {
      if (err) throw err;
      res.json(product)
    });
  });

  app.get("/api/userWishlist", (req, res) => {
    const userId = req.user._id;
    db.User.findOne({ _id: userId }, (err, user) => {
      if (err) throw err;
      const WishList = user.wishlist;
      db.Product.find().where('_id').in(WishList).exec((error, products) => {
        if (error) throw err;
        console.log(products)
        res.json({products});
      });
    })
  })

  app.post("/api/postProduct", upload.single("image"), (req, res) => {
    const product = new db.Product(req.body);
    product.assignSeller(req.user._id)
    if (req.file) {
      product.image = {
        data: fs.readFileSync(path.join(__dirname + '/../upload/' + req.file.filename)), 
        contentType: req.file.mimetype
      }
    }
    db.Product.create(product, function(err, created) {
      if (err) throw err;
      res.json(created)
    })
  });

  app.put("/api/editProduct/:id", upload.single("image"), (req, res) => {
    const id = req.params.id;
    const product = req.body;
    if (req.file) {
      product.image = {
        data: fs.readFileSync(path.join(__dirname + '/../upload/' + req.file.filename)), 
        contentType: req.file.mimetype
      }
    }
    db.Product.findByIdAndUpdate(id, {$set: product}, function(err, updated) {
      if (err) throw err;
      res.json(updated)
    });
  });

  app.delete("/api/deleteProduct/:id", function(req, res) {
    const id = req.params.id;
    db.Product.deleteOne({ _id: id }, function(err, deleted) {
      if (err) throw err;
      res.json(deleted)
    })
  })

};