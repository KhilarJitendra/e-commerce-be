const jwt = require("jsonwebtoken");

exports.protect = (req, res, next) => {
  // Get token from header
  const token = req.header("x-auth-token");
  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Make sure to set your JWT_SECRET in environment variables
    req.user = decoded.user; // Attach user information to the request
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
