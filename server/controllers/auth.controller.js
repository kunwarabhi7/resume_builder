import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const Register = async (req, res) => {
  const { username, email, password, fullName } = req.body;

  // Simple required fields check
  if (!username || !email || !password || !fullName) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if user already exists
    console.log("Checking existing user for email:", email);
    const existingUser = await User.findOne({ email });
    console.log("Existing user found:", existingUser);

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const user = new User({ username, email, password, fullName });
    await user.save();

    // Create JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
      },
      token,
    });
  } catch (error) {
    console.error("Error in Register controller:", error);

    // Handle Mongoose validation errors
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({ message: messages.join(", ") });
    }

    // Handle duplicate key error (e.g., unique email)
    if (error.code === 11000) {
      return res.status(400).json({ message: "Email already exists" });
    }

    return res.status(500).json({ message: "Internal server error" });
  }
};

export const Login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Create JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Set token in HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    return res.status(200).json({
      message: "User logged in successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
      },
      token,
    });
  } catch (error) {
    console.error("Error in Login controller:", error);

    // Handle Mongoose validation errors (rare here)
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({ message: messages.join(", ") });
    }

    return res.status(500).json({ message: "Internal server error" });
  }
};

export const Logout = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Use secure cookies in production
    sameSite: "strict",
  });
  return res.status(200).json({ message: "User logged out successfully" });
};

export const GetCurrentUser = async (req, res) => {
  const userId = req.user.id;
  try {
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
        profilePic: user.profilePic,
        address: user.address,
        phone: user.phone,
      },
    });
  } catch (error) {
    console.error("Error in GetCurrentUser controller:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const UpdateProfile = async (req, res) => {
  const userId = req.user.id;
  const { username, fullName, profilePic, address, phone } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (username !== undefined) user.username = username;
    if (fullName !== undefined) user.fullName = fullName;
    if (profilePic !== undefined) user.profilePic = profilePic;
    if (address !== undefined) user.address = address;
    if (phone !== undefined) user.phone = phone;

    await user.save();

    return res.status(200).json({
      message: "Profile updated successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
        profilePic: user.profilePic,
        address: user.address,
        phone: user.phone,
      },
    });
  } catch (error) {
    console.error("Error in UpdateProfile controller:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
