const express = require('express');
const router = express.Router();
const productModel = require('./schema.js');

// Create a new product
router.post('/create', async (req, res) => {
    try {
        const { name, category, subcategory, description, price, image } = req.body;
        const product = new productModel({ name, category, subcategory, description, price, image });
        const newProduct = await product.save();
        res.status(201).json({ message: "Product created successfully", product: newProduct });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Read all products
router.get('/read', async (req, res) => {
    try {
        const products = await productModel.find();
        res.status(200).json({ message: "Products retrieved successfully", products });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Read a single product by ID
router.get('/read/:id', async (req, res) => {
    try {
        const product = await productModel.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: "Product retrieved successfully", product });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update a product by ID
router.put('/update/:id', async (req, res) => {
    try {
        const { name, category, subcategory, description, price, image } = req.body;
        const updatedProduct = await productModel.findByIdAndUpdate(req.params.id, { name, category, subcategory, description, price, image }, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a product by ID
router.delete('/delete/:id', async (req, res) => {
    try {
        const deletedProduct = await productModel.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: "Product deleted successfully", product: deletedProduct });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
