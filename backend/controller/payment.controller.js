const { User } = require("../model/user.model");
const { Product } = require("../model/product.model");
const { Purchase } = require("../model/payment.model");
// const User = require("../model/user.model");

async function purchaseMethod(req, res) {
  try {
    const { cart } = req.body;
    const user = req.user;
    if (!cart) {
      res.status(400).json({ msg: "Missing parameters" });
      console.log(req);
      return;
    }
    const purchaseArray = {
      user: user.id,
      store: user.id,
      product: user.id,
      quantity: 10,
      price: 0,
      status: 0,
    };
    const result = await Purchase.create(purchaseArray);
    res.send(result);
  } catch (e) {
    console.log(e);
    res.status(500).send(JSON.stringify({ message: "Internal server error" }));
  }
}

module.exports = { purchaseMethod };
