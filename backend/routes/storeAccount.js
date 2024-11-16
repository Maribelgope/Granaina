const express = require("express");

const { ensureAuth } = require("../middleware/auth");

router = express.Router();

storeAccountController = require("../controller/storeAccount.controller");

router.get("/", [ensureAuth], storeAccountController.get);

router.patch("/", [ensureAuth], storeAccountController.patch);

module.exports = router;
