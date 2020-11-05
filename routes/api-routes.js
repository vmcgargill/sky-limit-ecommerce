const db = require("../models");
const passport = require("../config/passport");
const upload = require("../config/multer");
const fs = require('fs');
const path = require('path'); 

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

  app.post("/api/postProduct", upload.single("image"), (req, res) => {
    console.log(req.file)
    const product = req.body;
    
    if (req.file) {
      product.image = {
        data: fs.readFileSync(path.join(__dirname + '/../upload/' + req.file.filename)), 
        contentType: req.file.mimetype
      }
    }

    db.Product.create(product, function(err, product) {
      if (err) throw err;
      res.json(product)
    })
  });
  
};