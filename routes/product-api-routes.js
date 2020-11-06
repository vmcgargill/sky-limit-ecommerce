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
      res.json(product)
    })
  });

  app.post("/api/postProduct", upload.single("image"), (req, res) => {
    const product = new db.Product(req.body);
    product.assignSeller(req.user._id)
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