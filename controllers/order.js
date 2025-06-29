const Order = require('../models/order');
const Cart = require('../models/cart');

// Placing order from cart
exports.placeOrder = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.userId });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const newOrder = new Order({
      userId: req.user.userId,
      items: cart.items
    });

    await newOrder.save();

    // Clearing user's cart
    cart.items = [];
    await cart.save();

    res.status(201).json({ message: 'Order placed successfully', order: newOrder });
  } catch (error) {
    res.status(500).json({ error: 'Order placement failed' });
  }
};

// all orders of the logged-in user
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.userId }).populate('items.productId');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};
