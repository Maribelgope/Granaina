const { Product } = require("../model/product.model");
const User = require("../model/user.model");

async function getAll(req, res) {
  try {
    const user = req.user;
    const productInfo = await Product.find({ sellerId: user.id });
    res.status(200).send(productInfo);
  } catch (e) {
    res.status(500).send(JSON.stringify({ message: "Internal server error" }));
  }
}

async function get(req, res) {
  try {
    const user = req.user;
    let storeAccount = await User.findOne({ _id: user.id });
    if (!storeAccount) {
      res.status(404).json({ error: "Account not found" });
      return;
    }
    if (!storeAccount.store) {
      res.status(404).send("Store not found");
      return;
    }
    res.status(200).json(storeAccount);
  } catch (e) {
    console.log(e);
    res.status(500).send(JSON.stringify({ message: "Internal server error" }));
  }
}

async function patch(req, res) {
  try {
    const user = req.user;
    const { name, description, address, email, phoneNumber } = req.body;
    const userInfo = await User.findOne({ _id: user.id });
    const userArray = {
      name: name,
      description: description,
      address: address,
      email: email,
      phoneNumber: phoneNumber,
    };
    const result = await User.updateOne({ _id: userInfo._id }, userArray);
    res.status(200).send(result);
  } catch (e) {
    console.log(e);
    res.status(500).send(JSON.stringify({ message: "Internal server error" }));
  }
}

module.exports = { get, patch };
