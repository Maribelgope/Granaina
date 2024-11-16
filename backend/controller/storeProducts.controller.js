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
    const { product } = req.params;
    let productInfo = await Product.findOne({ _id: product });
    if (!productInfo) {
      res.status(404).json({ error: "Product not found" });
      return;
    }
    const sellerInfo = await User.findOne({
      _id: productInfo.sellerId,
    });
    if (!sellerInfo) {
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    productInfo = {
      ...productInfo._doc,
      sellerInfo: { name: sellerInfo.name, username: sellerInfo.username },
    };
    res.status(200).json(productInfo);
  } catch (e) {
    console.log(e);
    res.status(500).send(JSON.stringify({ message: "Internal server error" }));
  }
}

async function post(req, res) {
  try {
    const { URLName, name, description, price } = req.body;

    if (!URLName || !name || !description || price == undefined) {
      res.status(400).json({ msg: "Missing parameters" });
      return;
    }
    const productArray = {
      sellerId: req.user.id,
      URLName: URLName,
      name: name,
      description: description,
      price: price,
    };
    const result = await Product.create(productArray);
    res.send(result);
  } catch (e) {
    console.log(e);
    res.status(500).send(JSON.stringify({ message: "Internal server error" }));
  }
}

async function patch(req, res) {
  try {
    const { product } = req.params;
    const user = req.user;
    const { URLName, name, description, price } = req.body;
    const productInfo = await Product.findOne({ _id: product });
    if (user.id == productInfo.sellerId) {
      const productArray = {
        URLName: URLName,
        name: name,
        description: description,
        price: price,
      };
      const result = await Product.updateOne(
        { _id: productInfo._id },
        productArray
      );
      res.status(200).send(result);
    } else {
      res.status(400).json({ error: "This product isn't yours" });
    }
  } catch (e) {
    console.log(e);
    res.status(500).send(JSON.stringify({ message: "Internal server error" }));
  }
}

async function destroy(req, res) {
  try {
    const { product } = req.params;
    const user = req.user;
    const productInfo = await Product.findOne({ _id: product });
    if (user.id == productInfo.sellerId) {
      const result = await Product.deleteOne({ _id: product });
      res.send(result);
    } else {
      res.status(400).json({ error: "This product isn't yours" });
    }
  } catch (e) {
    console.log(e);
    res.status(500).send(JSON.stringify({ message: "Internal server error" }));
  }
}

module.exports = { getAll, get, post, patch, destroy };
