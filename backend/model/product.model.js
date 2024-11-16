const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  URLName: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

const Product = mongoose.model("Product", productSchema);
module.exports = { Product };
