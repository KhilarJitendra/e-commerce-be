const Order = require("../models/Order");
const Product = require("../models/product"); // Assuming you have a product model

// Place a new order
exports.placeOrder = async (req, res) => {
  const { products, totalAmount } = req.body;

  try {
    // Validate product IDs and calculate the total price
    const productDetails = await Promise.all(
      products.map(async (item) => {
        const product = await Product.findById(item.productId);
        if (!product) {
          throw new Error(`Product with ID ${item.productId} not found`);
        }
        return {
          productId: item.productId,
          quantity: item.quantity,
          price: product.price * item.quantity,
        };
      })
    );

    const totalCalculatedAmount = productDetails.reduce(
      (total, item) => total + item.price,
      0
    );

    // Validate the total amount
    if (totalAmount !== totalCalculatedAmount) {
      return res.status(400).json({ msg: "Total amount mismatch" });
    }

    // Create a new order
    const order = new Order({
      userId: req.user.id, // Authenticated user ID
      products: productDetails,
      totalAmount: totalCalculatedAmount,
      paymentStatus: "Pending",
      orderStatus: "Placed",
    });

    // Save the order in the database
    await order.save();

    res.status(201).json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Get all orders for the authenticated user
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id });
    res.json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Get order details by ID
exports.getOrderById = async (req, res) => {
  const orderId = req.params.id;

  try {
    const order = await Order.findOne({ _id: orderId, userId: req.user.id });
    if (!order) {
      return res.status(404).json({ msg: "Order not found" });
    }
    res.json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
