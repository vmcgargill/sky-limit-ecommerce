const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  title: {
    required: true,
    type: String
  },
  description: {
    required: true,
    type: String
  },
  rating: {
    required: true,
    type: Number
  },
  reviewer: {
    type: Schema.Types.ObjectId, 
    ref: 'User' 
  },
  seller: {
    type: Schema.Types.ObjectId, 
    ref: 'User' 
  },
  product: {
    type: Schema.Types.ObjectId, 
    ref: 'Product' 
  }
});

const Review = mongoose.model("Review", ReviewSchema);

module.exports = Review;