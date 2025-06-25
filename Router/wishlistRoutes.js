const express = require("express");
const router = express.Router();
const wishlistController = require("../controllers/wishlistController");

router.get("/:userId", wishlistController.getWishlist);
router.post("/add", wishlistController.addToWishlist);
router.post("/remove", wishlistController.removeFromWishlist);

module.exports = router;
