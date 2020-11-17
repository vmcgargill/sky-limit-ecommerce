const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  title: {
    type: String
  },
  description: {
    type: String
  },
  rating: {
    type: Number
  },
  reviewer: { 
    type: Schema.Types.ObjectId, 
    ref: 'User' 
  },
  product: {
    type: Schema.Types.ObjectId, 
    ref: 'Product' 
  }
});

ReviewSchema.methods.assignReviewer = function(userId) {
  return this.reviewer = userId;
};

ReviewSchema.methods.assignProduct = function(productId) {
  return this.product = productId;
};

const Review = mongoose.model("Review", ReviewSchema);

module.exports = Review;