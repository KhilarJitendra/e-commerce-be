const express = require("express");
const { check } = require("express-validator");
const { registerUser, loginUser } = require("../controllers/authController");
const {
  getUserProfile,
  updateProfile,
} = require("../controllers/userController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// @route   GET /api/user/profile
// @desc    Retrieve the details of the authenticated user
// @access  Private
router.get("/profile", protect, getUserProfile);

// @route   PUT /api/user/profile
// @desc    Update the authenticated user's profile details
// @access  Private
router.put(
  "/profile",
  protect,
  [
    check("name", "Name is required").optional().not().isEmpty(),
    check("email", "Please include a valid email").optional().isEmail(),
  ],
  updateProfile
);

module.exports = router;
