const User = require("../models/user-model");

// Home Route
const home = async (req, res) => {
  try {
    res.status(200).send("Welcome to profile");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Register Controller
const register = async (req, res, next) => {
  try {
    const { username, email, phone, password } = req.body;

    // Field validation (double check after Zod)
    if (!username || !email || !phone || !password) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    // Check if user already exists
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(409).json({ msg: "Email already exists" });
    }

    // Create new user
    const newUser = await User.create({ username, email, phone, password });

    // Generate JWT token
    const token = await newUser.generateToken();

    res.status(201).json({
      msg: "User registered successfully",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
      token,
    });
  } catch (error) {
    next(error);
  }
};

// Login Controller
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Input validation
    if (!email || !password) {
      return res.status(400).json({ msg: "Email and password are required" });
    }

    // Check if user exists
    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.status(401).json({ msg: "Invalid email or password" });
    }

    // Check password
    const isMatch = await userExist.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ msg: "Invalid email or password" });
    }

    // Generate JWT
    const token = await userExist.generateToken();

    res.status(200).json({
      msg: "Login successful",
      token,
      userId: userExist._id.toString(),
    });
  } catch (error) {
    next(error);
  }
};

// user logic
const user = async (req, res) => {
  try {
    const userData = req.user;
    return res.status(200).json({  userData });
  } catch (error) {
    console.log(`Error from the user route: ${error}`);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


module.exports = { home, register, login, user };
