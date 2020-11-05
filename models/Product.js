const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const { mongooseAssociation } = require('mongoose-association');
// mongooseAssociation(mongoose);

const ProductSchema = new Schema({
  name: {
    type: String
  },
  category: {
    type: String
  },
  price: {
    type: Number
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
    ref: 'User' 
  }
});

// ProductSchema.belongsTo('User').index(1, { sparse: true })

// ProductSchema.belongsTo('User', {
//   as: 'seller'
// })

ProductSchema.methods.assignSeller = function(userId) {
  return this.seller = userId;
};

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;