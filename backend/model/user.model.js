const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  cart: {
    type: [
      mongoose.Schema({
        id: {
          type: String,
          required: false,
        },
        quantity: {
          type: Number,
          required: false,
        },
      }),
    ],
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
