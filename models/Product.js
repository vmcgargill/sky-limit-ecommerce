const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String
  },
  image: {
    data: Buffer, 
    contentType: String 
  },
  seller: { 
    type: Schema.Types.ObjectId, 
    ref: 'User',
    required: true
  },
  reviews: [{
    type: Schema.Types.ObjectId, 
    ref: 'Review'
  }]
});

ProductSchema.methods.assignSeller = function(userId) {
  return this.seller = userId;
};

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;