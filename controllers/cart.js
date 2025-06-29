const Cart = require('../models/cart');
const Product = require('../models/product');


exports.getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.user.userId }).populate('items.productId');

    // If cart doesn't exist, create an empty one
    if (!cart) {
      cart = new Cart({ userId: req.user.userId, items: [] });
      await cart.save();
    }

    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching cart' });
  }
};

// Add or update item in cart
exports.addToCart = async (req, res) => {
  const { productId } = req.body;

  try {
    let cart = await Cart.findOne({ userId: req.user.userId });

    if (!cart) {
      cart = new Cart({ userId: req.user.userId, items: [] });
    }

    const existingItem = cart.items.find(item => item.productId.toString() === productId);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.items.push({ productId, quantity: 1 });
    }

    await cart.save();
    res.status(200).json({ message: 'Item added/updated in cart', cart });
  } catch (err) {
    res.status(500).json({ error: 'Error adding to cart' });
  }
};

// Remove product from cart
exports.removeFromCart = async (req, res) => {
  const { productId } = req.params;

  try {
    const cart = await Cart.findOne({ userId: req.user.userId });

    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    cart.items = cart.items.filter(item => item.productId.toString() !== productId);

    await cart.save();
    res.status(200).json({ message: 'Item removed from cart', cart });
  } catch (err) {
    res.status(500).json({ error: 'Error removing from cart' });
  }
};
