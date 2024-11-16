const { Purchase } = require("../model/payment.model");
const User = require("../model/user.model");

async function clientsPurchases(req, res) {
  try {
    const user = req.user;
    const purchases = await Purchase.find({ store: user.id });
    const purchasesUsers = purchases.map((purchase) => {
      return { _id: purchase.user._id };
    });
    const users = await User.find({ $or: purchasesUsers });
    const purchasesArray = purchases.map((purchase) => {
      const userInfo = users.filter((user) => {
          return user._id + "" == purchase.user;
        })[0],
        result = {
          id: purchase._id,
          price: purchase.price,
          quantity: purchase.quantity,
          total: purchase.price * purchase.quantity,
          customer: {name: userInfo.name, lastname: userInfo.lastname, email: userInfo.email},
          price: purchase.price,
          status: purchase.status
        };
      return result;
    });
    res.status(200).send(purchasesArray);
  } catch (e) {
    console.log(e);
    res.status(500).send(JSON.stringify({ message: "Internal server error" }));
  }
}

module.exports = { clientsPurchases };
