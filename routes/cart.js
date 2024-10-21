const express = require("express");
const {
  getCartItems,
  addItemToCart,
  updateCartItem,
  removeItemFromCart,
} = require("../controllers/cartController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// @route   GET /api/cart
// @desc    Get items in the user's cart
// @access  Private
router.get("/", protect, getCartItems);

// @route   POST /api/cart
// @desc    Add an item to the cart
// @access  Private
router.post("/", protect, addItemToCart);

// @route   PUT /api/cart/:itemId
// @desc    Update quantity of an item in the cart
// @access  Private
router.put("/:itemId", protect, updateCartItem);

// @route   DELETE /api/cart/:itemId
// @desc    Remove item from the cart
// @access  Private
router.delete("/:itemId", protect, removeItemFromCart);

module.exports = router;
