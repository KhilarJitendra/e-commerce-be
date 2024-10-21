const express = require("express");
const {
  placeOrder,
  getOrders,
  getOrderById,
} = require("../controllers/orderController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// @route   POST /api/orders
// @desc    Place a new order
// @access  Private
router.post("/", protect, placeOrder);

// @route   GET /api/orders
// @desc    Get all orders for the authenticated user
// @access  Private
router.get("/", protect, getOrders);

// @route   GET /api/orders/:id
// @desc    Get order details by ID
// @access  Private
router.get("/:id", protect, getOrderById);

module.exports = router;
