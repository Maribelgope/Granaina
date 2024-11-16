const mongoose = require("mongoose");

const purchaseSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  store: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  status: {
    type: Number,
    required: true,
  },
});

const Purchase = mongoose.model("Purchase", purchaseSchema);
module.exports = { Purchase };
