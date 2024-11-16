const express = require("express");

const { ensureAuth } = require("../middleware/auth");

router = express.Router();

searchController = require("../controller/search.controller");

router.get("/", searchController.search);

module.exports = router;
