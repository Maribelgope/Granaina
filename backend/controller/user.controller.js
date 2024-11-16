const bcryptjs = require("bcryptjs");
const User = require("../model/user.model.js");
const jwt = require("../services/jwt");
const zxcvbn = require("zxcvbn");

const minPasswordScore = 2;

async function get(req, res) {
  try {
    const user = req.user;
    const userInfo = await User.findOne({ email: user.email });
    if (!userInfo) {
      res.status(404).json({ error: "The user does not exist" });
      return;
    }
    let storeInfo = {};
    if (userInfo.store) {
      storeInfo = { verified: userInfo.verified };
    }
    res
      .status(200)
      .json({ username: userInfo.username, name: userInfo.name, ...storeInfo });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ error: "Missing parameters" });
      return;
    }
    const userInfo = await User.findOne({ email });
    if (!userInfo) {
      res.status(400).json({ error: "Incorrect email or password" });
      return;
    }
    const correctPassword = await bcryptjs.compare(password, userInfo.password);
    if (!correctPassword) {
      res.status(400).json({ error: "Incorrect email or password" });
      return;
    }
    res.status(200).json({
      token: jwt.createToken(userInfo, "24h"),
      email: userInfo.email,
      store: userInfo.store ? true : false,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function signup(req, res) {
  try {
    let { username, name, email, password, store } = req.body;
    if (!name || !email || !password) {
      res.status(400).json({ error: "Missing parameters" });
      return;
    }

    if (!username) {
      username = name.replaceAll(" ", "_").toLowerCase();
    }

    const usernameInfo = await User.find({
      username: username,
    });
    if (usernameInfo.length) {
      res.status(400).json({
        error: {
          username: "The username is already taken",
        },
      });
      return;
    }
    const emailInfo = await User.findOne({email});

    if (emailInfo) {
      res.status(400).json({
        error: {
          email: "The email is already in use",
        },
      });
      return;
    }

    const passwordScore = zxcvbn(password).score;
    if (passwordScore < minPasswordScore) {
      res.status(400).json({ error: "The password is too weak" });
      return;
    }

    const salt = bcryptjs.genSaltSync(10);
    const passwordHash = await bcryptjs.hash(password, salt);

    let userArray;

    if (store) {
      userArray = {
        username: username,
        name: name,
        email: email,
        password: passwordHash,
      };
    } else {
      userArray = {
        username: username,
        name: name,
        email: email,
        password: passwordHash,
      };
    }

    const result = await User.create(userArray);
    res.status(200).json({
      token: jwt.createToken(userArray, "24h"),
      email: userArray.email,
      store: userArray.store ? true : false,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function changePassword(req, res) {
  try {
    const { password, newPassword } = req.body;
    const user = req.user;
    const userInfo = await User.findOne({ _id: user.id });
    if (!userInfo) {
      res.status(400).json({ error: "The user does not exist" });
      return;
    }
    if (!password || !newPassword) {
      res.status(400).json({ error: "Missing parameters" });
      return;
    }
    const correctPassword = await bcryptjs.compare(password, userInfo.password);
    if (!correctPassword) {
      res.status(400).json({ error: "Incorrect password" });
      return;
    }
    const passwordScore = zxcvbn(newPassword).score;
    if (passwordScore < minPasswordScore) {
      res.status(400).json({ error: "The new password is too weak" });
      return;
    }
    const salt = bcryptjs.genSaltSync(10);
    const passwordHash = await bcryptjs.hash(newPassword, salt);

    const result = await User.updateOne(
      { _id: user.id },
      { password: passwordHash }
    );
    res.status(200).json(result);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function changeEmail(req, res) {
  try {
    const { newEmail } = req.body;
    if (!newEmail) {
      res.status(400).json({ error: "Missing parameters" });
      return;
    }
    const user = req.user;
    const userInfo = await User.findOne({ _id: user.id });
    if (!userInfo) {
      res.status(400).json({ error: "The user does not exist" });
      return;
    }
    const result = await User.updateOne({ _id: user.id }, { email: newEmail });
    res.status(200).json(result);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getCart(req, res) {
  try {
    const user = req.user;
    const userInfo = await User.findOne({ _id: user.id });
    if (!userInfo) {
      res.status(400).json({ error: "The user does not exist" });
      return;
    }
    const cart = userInfo.cart || [];
    res.status(200).json(cart);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function updateCart(req, res) {
  try {
    const updatedProduct = req.body;
    if (!updatedProduct) {
      res.status(400).json({ error: "Missing parameters" });
      return;
    }
    const user = req.user;
    const userInfo = await User.findOne({ _id: user.id });
    if (!userInfo) {
      res.status(400).json({ error: "The user does not exist" });
      return;
    }
    let cart = userInfo.cart || [];
    const cartItem = userInfo.cart.find(
      (product) => product.id == updatedProduct.id
    );
    if (!cartItem) {
      cart.push(updatedProduct);
    } else {
      cart = cart.map((product) => {
        if (product.id == updatedProduct.id) {
          return updatedProduct;
        }
        return product;
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function patch(req, res) {
  try {
    const user = req.user;
    const { name } = req.body;
    const userArray = {
      name: name,
    };
    const result = await User.updateOne({ email: user.email }, userArray);
    res.send(result);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function destroy(req, res) {
  try {
    const user = req.user;
    const result = await User.deleteOne({ _id: user.id });
    res.send(result);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  get,
  login,
  signup,
  changePassword,
  changeEmail,
  getCart,
  updateCart,
  patch,
  destroy,
};
