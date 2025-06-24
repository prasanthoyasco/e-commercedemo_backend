const express = require("express");
const router = express.Router();
const { globalSearch } = require("../controllers/SearchController");

router.get("/search", globalSearch);

module.exports = router;
