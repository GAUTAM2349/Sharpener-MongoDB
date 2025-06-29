const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart');
const authenticate = require('../middlewares/usersOnly');

// All routes are protected
router.get('/', authenticate, cartController.getCart);
router.post('/add', authenticate, cartController.addToCart);
router.delete('/remove/:productId', authenticate, cartController.removeFromCart);

module.exports = router;
