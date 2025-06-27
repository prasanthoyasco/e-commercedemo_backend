// controllers/cartController.js

const Cart = require('../Model/Cart'); // CartPageItem
const User = require('../Model/User');

exports.addToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ userId });

    if (cart) {
      // Check if product already exists
      const existingProduct = cart.products.find(
        (item) => item.productId.toString() === productId
      );

      if (existingProduct) {
        // Update quantity
        existingProduct.quantity += quantity || 1;
      } else {
        // Add new product
        cart.products.push({ productId, quantity: quantity || 1 });
      }

      await cart.save();
    } else {
      // Create new cart
      cart = new Cart({
        userId,
        products: [{ productId, quantity: quantity || 1 }]
      });
      await cart.save();

      // Link cart to user
      await User.findByIdAndUpdate(userId, {
        $push: { cartList: cart._id }
      });
    }

    res.status(200).json({ message: 'Product added to cart', cart });
  } catch (error) {
    res.status(500).json({ error: 'Error adding to cart', details: error.message });
  }
};

exports.getUserCart = async (req, res) => {
    const { userId } = req.params;
  
    try {
      const cart = await Cart.findOne({ userId }).populate('products.productId');
  
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }
  
      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching cart', details: error.message });
    }
  };

  exports.removeFromCart = async (req, res) => {
    const { userId, productId } = req.body;
  
    try {
      const cart = await Cart.findOne({ userId });
  
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }
  
      const updatedProducts = cart.products.filter(
        (item) => item.productId.toString() !== productId
      );
  
      cart.products = updatedProducts;
      await cart.save(); // 🧠 This line saves the updated cart (product removed)
  
      res.status(200).json({ message: 'Product removed from cart', cart });
    } catch (error) {
      res.status(500).json({ error: 'Error removing from cart', details: error.message });
    }
  };
  
  exports.updateQuantity = async (req, res) => {
    const { userId, productId, quantity } = req.body;
  
    try {
      const cart = await Cart.findOne({ userId });
  
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }
  
      const product = cart.products.find(
        (item) => item.productId.toString() === productId
      );
  
      if (!product) {
        return res.status(404).json({ message: 'Product not found in cart' });
      }
  
      product.quantity = quantity; // 🔁 Set new quantity directly
  
      await cart.save();
  
      res.status(200).json({ message: 'Quantity updated', cart });
    } catch (error) {
      res.status(500).json({ error: 'Error updating quantity', details: error.message });
    }
  };
  