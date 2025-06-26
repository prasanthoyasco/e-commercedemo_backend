const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product"
        },
        addedAt: {
          type: Date,
          default: Date.now
        }
      }
    ],
    name: { type: String, default: "My Wishlist" },
    isPublic: { type: Boolean, default: false }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Wishlist", wishlistSchema);
