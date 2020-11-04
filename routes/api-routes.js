const mongojs = require("mongojs");
const db = require("../models")

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
  
};