const Product = require('../models/product');


exports.postAddProduct = async (req, res) => {
  const { title, imageUrl, price, description } = req.body;
  try {
    const product = new Product({
      title,
      price,
      imageUrl,
      description,
      userId: req.user._id
    });

    await product.save();
    res.status(201).json({ message: 'Product created', product });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create product' });
  }
};


exports.getEditProduct = async (req, res) => {
  const prodId = req.params.productId;

  try {
    const product = await Product.findOne({ _id: prodId, userId: req.user._id });

    if (!product) return res.status(404).json({ message: 'Product not found or unauthorized' });

    res.json(product);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching product' });
  }
};

// Update a product
exports.postEditProduct = async (req, res) => {
  const { productId, title, price, imageUrl, description } = req.body;

  try {
    const product = await Product.findOne({ _id: productId, userId: req.user._id });

    if (!product) return res.status(404).json({ message: 'Product not found or unauthorized' });

    product.title = title;
    product.price = price;
    product.description = description;
    product.imageUrl = imageUrl;

    await product.save();
    res.json({ message: 'Product updated', product });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update product' });
  }
};


exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find({ userId: req.user._id });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};


exports.postDeleteProduct = async (req, res) => {
  const { productId } = req.body;

  try {
    const result = await Product.deleteOne({ _id: productId, userId: req.user._id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Product not found or unauthorized' });
    }

    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
};
