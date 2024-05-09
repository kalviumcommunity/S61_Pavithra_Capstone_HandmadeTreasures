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

module.exports = router;
