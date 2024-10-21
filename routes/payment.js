const express = require("express");
const { check } = require("express-validator");
const {
  initiatePayment,
  getPaymentStatus,
} = require("../controllers/paymentController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// @route   POST /api/payments
// @desc    Initiate a payment for an order
// @access  Private (protected by JWT)
router.post(
  "/",
  protect, // JWT token validation
  [
    check("orderId", "Order ID is required").not().isEmpty(),
    check("amount", "Amount is required").isFloat({ gt: 0 }),
    check("paymentMethod", "Payment method is required").not().isEmpty(),
  ],
  initiatePayment
);

// @route   GET /api/payments/status/:orderId
// @desc    Get the payment status of a specific order
// @access  Private (protected by JWT)
router.get("/status/:orderId", protect, getPaymentStatus);

module.exports = router;
