const db = require("../../models");

module.exports = function (req, res, next) {
  const userId = req.user._id;
  const reviewId = req.params.id;
  db.Review.findOne({ _id: reviewId }, (err, review) => {
    if (err) throw err;
    if (review.reviewer.toString() === userId) {
      return next();
    } else if (review.reviewer.toString() !== userId) {
      return res.json(404);
    }
  })
};