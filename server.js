const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const mongoose = require("mongoose"); // Add Mongoose

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json()); // Parse incoming requests with JSON payloads
app.use(cors()); // Enable CORS

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Test route
app.get("/", (req, res) => {
  res.send("E-Commerce API is running");
});

app.use("/api/auth", authRoutes);

// Set the server to listen on a port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
