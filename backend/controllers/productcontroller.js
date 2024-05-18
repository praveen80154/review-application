const Product = require('../models/productmodel');
const jwt = require('jsonwebtoken');

// Add a new product
exports.addProduct = async (req, res) => {
    try {
        const { title, description, amount, category} = req.body;

        const product = await Product.create({
            title,
            description,
            amount,
            category
        });
        product.save();
        res.status(201).json({ success: true, product });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
 
// Delete a product
exports.deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        await Product.findByIdAndDelete(productId);
        res.status(200).json({ success: true, message: "Product deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
// Edit review
exports.editReview = async (req, res) => {
    try {
        const productId = req.params.id;
        const {rating,review}=req.body;
        const product = await Product.findById(productId); 
        
        product.rating.push(rating);
        product.review.push(review);
        product.save();
        console.log(product)
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        res.status(200).json({ success: true, product });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
// Get all products
exports.getAllProduct = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({ success: true, products });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


exports.getAllReviews = async (req, res) => {
    try {
        const productId=req.params.id;
        const product = await Product.findById(productId);
        console.log(product)
        res.status(200).json({ success: true, product });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


