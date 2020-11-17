const db = require("../../models");

module.exports = function (req, res, next) {
  const userId = req.user._id;
  const productId = req.params.id;
  db.Product.findOne({ _id: productId }, (err, product) => {
    if (err) throw err;
    if (product.seller.toString() === userId) {
      return next();
    } else if (product.seller.toString() !== userId) {
      return res.json(404);
    }
  })
};