const Payment = require("../models/Payment"); // Assuming you have a Payment model
const Order = require("../models/Order"); // Assuming you have an Order model

// Initiate Payment
exports.initiatePayment = async (req, res) => {
  const { orderId, amount, paymentMethod } = req.body;

  try {
    // Check if the order exists for the user
    const order = await Order.findOne({ _id: orderId, userId: req.user.id });
    if (!order) {
      return res.status(404).json({ msg: "Order not found for this user" });
    }

    // Create a new payment object
    const payment = new Payment({
      orderId,
      userId: req.user.id, // Extract user ID from the authenticated user
      amount,
      paymentMethod,
      paymentStatus: "Pending", // Initial payment status
    });

    // Save the payment to the database
    await payment.save();

    // Here, you'd typically initiate the payment with a payment gateway (like Stripe or PayPal)
    // For simplicity, we're assuming it's pending now

    res.status(201).json(payment); // Return the payment object
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Get Payment Status
exports.getPaymentStatus = async (req, res) => {
  const { orderId } = req.params;

  try {
    // Fetch the payment based on the orderId and userId (to ensure the user can only see their own payments)
    const payment = await Payment.findOne({ orderId, userId: req.user.id });
    if (!payment) {
      return res.status(404).json({ msg: "Payment not found for this order" });
    }

    // Return the payment status
    res.json({ paymentStatus: payment.paymentStatus });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
