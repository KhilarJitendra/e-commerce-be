const User = require("../models/User");

// Fetch User Profile

exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming the user ID is stored in req.user after authentication
    const user = await User.findById(userId).select("-password"); // Exclude password from the response
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

// Function to  update user profile

exports.updateProfile = async (req, res) => {
  const { name, email } = req.body;

  // Build user Object

  const userField = {};
  if (name) userField.name = name;
  if (email) userField.email = email;

  try {
    const userId = req.user.id; // Assuming the user ID is stored in req.user after authentication
    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    user = await user.findByIdAndUpdate(
      userId,
      { $set: userField },
      { new: true }
    );

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};
