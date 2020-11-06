const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Bcrypt = require("bcryptjs");

const UserSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    bcrypt: true 
  },
  name: {
    type: String
  },
  phone: {
    type: Number
  },
  address: {
    type: String
  },
  paymeny: [{
    type: Number
  }],
  cart: [{
    type: Schema.Types.ObjectId,
    ref: 'Product'
  }],
  wishlist: [{
    type: Schema.Types.ObjectId,
    ref: 'Product'
  }]
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