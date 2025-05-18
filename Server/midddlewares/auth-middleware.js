const jwt = require("jsonwebtoken");
const User = require("../models/user-model");


const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");

  // Check if token is present
  if (!token) {
    return res.status(401).json({ msg: "Authorization token is missing" });
  }

  // Remove 'Bearer ' part of the token if it exists and trim any whitespace
  const jwtToken = token.replace("Bearer ", "").trim();

  try {
    // Verify the token with JWT secret
    const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);

    // Find user using the email stored in the token
    const userData = await User.findOne({ email: isVerified.email }).select({
      password: 0, // Exclude password field
    });

    if (!userData) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Attach user data and token to the request object
    req.user = userData;
    req.token = token;
    req.userId = userData._id; // Correcting the typo here

    // Call next() to pass control to the next middleware or route handler
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    // Send a 401 error if token verification fails
    return res.status(401).json({ msg: "Invalid or expired token" });
  }
};

module.exports = authMiddleware;
