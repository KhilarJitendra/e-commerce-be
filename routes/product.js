const express = require("express");
const {
  getProducts,
  getProductById,
} = require("../controllers/productController");

const router = express.Router();

// @route   GET /api/products
// @desc    Fetch all products
// @access  Public
router.get("/", getProducts);

// @route   GET /api/products/:id
// @desc    Fetch a single product by ID
// @access  Public
router.get("/:id", getProductById);

module.exports = router;
