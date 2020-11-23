const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Bcrypt = require("bcryptjs");

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 3
  },
  password: {
    type: String,
    required: true,
    bcrypt: true,
    minlength: 8,
    maxlength: 25
  },
  name: {
    type: String,
    minlength: 1,
    maxlength: 25
  },
  phone: {
    type: Number,
    minlength: 9,
    maxlength: 15
  },
  address: [{
    country: { type: String },
    name: { type: String },
    addressLine1: { type: String },
    addressLine2: { type: String },
    city: { type: String },
    state: { type: String },
    zip: { type: String },
    default: Boolean
  }],
  cart: [{
    type: Schema.Types.ObjectId,
    ref: 'Product'
  }],
  wishlist: [{
    type: Schema.Types.ObjectId,
    ref: 'Product'
  }],
  orderHistory: {
    type: Schema.Types.ObjectId,
    ref: 'Product'
  }
});

UserSchema.plugin(require('mongoose-bcrypt'));

UserSchema.methods.comparePassword = function(password, callback) {
  Bcrypt.compare(password, this.password, function(err, match) {
    if (err) return cb(err);
    callback(null, match);
  })
};

const User = mongoose.model("User", UserSchema);

module.exports = User;