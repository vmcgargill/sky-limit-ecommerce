const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  buyer: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  products: [{
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product'
    },
    originalName: String,
    buyPrice: Number
  }],
  purchaseDate: {
    type: Date,
    default: Date.now
  },
  total: Number
});

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;