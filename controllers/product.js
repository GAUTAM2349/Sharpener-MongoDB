const Product = require("../models/product");

// Create
exports.createProduct = async (req, res) => {
  const { title, price, imageUrl, description } = req.body;

  try {
    const product = new Product({
      title,
      price,
      imageUrl,
      description,
      userId: req.user.userId, 
    });

    await product.save();
    res.status(201).json({ message: "Product created", product });
  } catch (err) {
    res.status(500).json({ error: "Error creating product" });
  }
};

// Get All
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Error fetching products" });
  }
};

// Get One
exports.getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: "Error fetching product" });
  }
};

// Update
exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { title, price, imageUrl, description } = req.body;

  try {
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (product.userId.toString() !== req.user.userId)
      return res
        .status(403)
        .json({ message: "Unauthorized: Not your product" });

    product.title = title;
    product.price = price;
    product.imageUrl = imageUrl;
    product.description = description;

    await product.save();
    res.json({ message: "Product updated", product });
  } catch (err) {
    res.status(500).json({ error: "Error updating product" });
  }
};

// Delete
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (product.userId.toString() !== req.user.userId)
      return res
        .status(403)
        .json({ message: "Unauthorized: Not your product" });

    await Product.findByIdAndDelete(id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting product" });
  }
};
