const { Product } = require("../model/product.model");
const User = require("../model/user.model");

async function search(req, res) {
  try {
    let { query } = req.query;
    const productsInfo = await Product.find({
      name: { $regex: ".*" + query + ".*", $options: "i" },
    });

    res.status(200).json(productsInfo);
  } catch (e) {
    console.log(e);
    res.status(500).send(JSON.stringify({ message: "Internal server error" }));
  }
}

module.exports = { search };
