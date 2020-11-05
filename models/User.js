const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Bcrypt = require("bcryptjs");

const UserSchema = new Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String, 
    required: true, 
    bcrypt: true 
  },
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