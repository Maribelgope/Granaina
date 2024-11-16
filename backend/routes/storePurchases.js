const express = require("express");

const { ensureAuth } = require("../middleware/auth");

router = express.Router();

storePurchase = require("../controller/storePurchase.controller");

router.get("/clientspurchases", [ensureAuth], storePurchase.clientsPurchases);

module.exports = router;
