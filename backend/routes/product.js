const express = require("express");

const { ensureAuth } = require("../middleware/auth");

router = express.Router();

productController = require("../controller/product.controller");

router.get("/", productController.getAll);

router.get("/:product", productController.get);

module.exports = router;
