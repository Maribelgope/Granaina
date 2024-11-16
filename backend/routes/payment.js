const express = require("express");

const { ensureAuth } = require("../middleware/auth");

router = express.Router();

paymentController = require("../controller/payment.controller");

router.post("/purchase", [ensureAuth], paymentController.purchaseMethod);

module.exports = router;
