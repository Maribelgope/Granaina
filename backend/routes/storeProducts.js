const express = require("express");

const { ensureAuth } = require("../middleware/auth");

router = express.Router();

productController = require("../controller/storeProducts.controller");

router.get("/", [ensureAuth], productController.getAll);

router.get("/:product", [ensureAuth], productController.get);

router.post("/", [ensureAuth], productController.post);

router.patch("/:product", [ensureAuth], productController.patch);

router.delete("/:product", [ensureAuth], productController.destroy);

module.exports = router;
