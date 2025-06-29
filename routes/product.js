const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/usersOnly');
const productController = require('../controllers/product');

router.post('/', authenticate, productController.createProduct);
router.get('/', authenticate, productController.getAllProducts);
router.get('/:id', authenticate, productController.getProductById);
router.put('/:id', authenticate, productController.updateProduct);
router.delete('/:id', authenticate, productController.deleteProduct);

module.exports = router;
