const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order');
const authenticate = require('../middlewares/usersOnly');

router.post('/', authenticate, orderController.placeOrder);
router.get('/', authenticate, orderController.getMyOrders);

module.exports = router;
