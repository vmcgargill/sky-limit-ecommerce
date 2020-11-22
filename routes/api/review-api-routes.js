const db = require("../../models");
const router = require("express").Router();
const isAuthenticated = require("../../config/middleware/isAuthenticated");

router.get("/api/review/:id", (req, res) => {
  const id = req.params.id
  db.Review.findById(id).populate("product").populate("reviewer").populate("seller").exec().then(review => {
    console.log(review)
    return res.json(review);
  }).catch(() => {
    return res.json(404);
  })
})

router.get("/api/product/reviews/:id", (req, res) => {
  const id = req.params.id;
  db.Product.findById(id).populate("reviews").exec().then(product => {
    console.log(product)
    return res.json(product)
  }).catch(() => {
    return res.json(404);
  })
})

router.post("/api/postReview/:id", isAuthenticated, (req, res) => {
  const review = req.body;
  const productId = req.params.id;
  review.product = productId;
  const userId = req.user._id;
  review.reviewer = userId;

  db.Product.findById(productId, (err, product) => {
    if (err) throw err;
    review.seller = product.seller;
    if (product.seller.toString() === userId) {
      return res.json(404);
    } else {
      db.Order.find({buyer: userId, products: {$elemMatch: {productId: productId}}}, (error, orders) => {
        if (error) throw error;
        if (orders.length === 0) {
          return res.json(404);
        } else if (orders.length > 0) {
          db.Review.findOne({ reviewer: userId, product: productId }, (errMsg, existingReview) => {
            if (errMsg) throw errMsg;
            console.log("Result: " + existingReview)
            if (existingReview !== null) {
              return res.json(404)
            } else {
              db.Review.create(review, (errorMsg, newReview) => {
                if (errorMsg) throw errorMsg;
                else if (newReview) {
                  db.Product.findByIdAndUpdate(productId, {
                    $addToSet: {reviews: newReview._id}
                  }, (errorMessage, updatedProduct) => {
                    if (errorMessage) throw errorMessage;
                    if (updatedProduct) {
                      res.json({review: newReview})
                    }
                  })
                }
              })
            }
          })
        }
      })
    }
  })
})

module.exports = router;