const Wishlist = require("../Model/wishlistModal");
const Product = require("../Model/ProductModel");
const User = require("../Model/User");

// ✅ Get wishlist for a user
exports.getWishlist = async (req, res) => {
  const { userId } = req.params;

  try {
    const wishlist = await Wishlist.findOne({ user: userId }).populate("products.product");
    if (!wishlist) return res.status(200).json({ products: [] });

    res.status(200).json({ products: wishlist.products });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Add product to wishlist (both in Wishlist model & User model)
exports.addToWishlist = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    // 1. Add to Wishlist model
    let wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
      wishlist = new Wishlist({ user: userId, products: [] });
    }

    const alreadyInWishlist = wishlist.products.some(
      (p) => p.product.toString() === productId
    );

    if (!alreadyInWishlist) {
      wishlist.products.push({ product: productId });
      await wishlist.save();
    }

    // 2. Also update User model
    const user = await User.findById(userId);
    const alreadyInUser = user.wishlist.some(
      (p) => p.toString() === productId
    );

    if (!alreadyInUser) {
      user.wishlist.push(productId);
      await user.save();
    }

    res.status(200).json({ message: "Product added to wishlist" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Remove product from wishlist
exports.removeFromWishlist = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    // 1. Remove from Wishlist model
    const wishlist = await Wishlist.findOneAndUpdate(
      { user: userId },
      { $pull: { products: { product: productId } } },
      { new: true }
    );

    // 2. Also remove from User model
    await User.findByIdAndUpdate(
      userId,
      { $pull: { wishlist: productId } },
      { new: true }
    );

    res.status(200).json({ message: "Product removed", wishlist });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
