const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Bcrypt = require("bcryptjs");

const PaymentSchema = new Schema({
    cardNumber: {
      type: String,
      minlength: 13,
      maxlength: 19,
      required: true,
      bcrypt: true
    },
    last4digits: {
      type: Number,
      minlength: 4,
      maxlength: 4,
      required: true
    },
    cvc: {
      type: String,
      minlength: 3,
      maxlength: 4,
      required: true,
      bcrypt: true
    },
    expirationDate: {
      type: String,
      required: true
    },
    cardHolder: {
      type: Schema.Types.ObjectId, 
      ref: 'User'
    },
    default: Boolean
});

PaymentSchema.plugin(require('mongoose-bcrypt'));

PaymentSchema.methods.compareCVC = function(CVC, callback) {
  Bcrypt.compare(CVC, this.cvc, function(err, match) {
    if (err) return callback(err);
    callback(null, match);
  })
};

const Payment = mongoose.model("Payment", PaymentSchema);

module.exports = Payment;