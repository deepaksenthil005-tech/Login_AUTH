import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/Users.js";

const router = express.Router();
const JWT_SECRET = "your_jwt_secret"; // Change this in production

// Register
router.post("/register", async (req, res) => {
  const { username, email, password, role, photo } = req.body;
  try {
    if (!username || !String(username).trim()) {
      return res.status(400).json({ message: "Username is required" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username: String(username).trim(),
      email,
      password: hashedPassword,
      role,
      photo : photo || '',
    });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });
    const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({
      message: "Login successful",
      token: token,
      role: user.role,
      username: user.username,
      photo : user.photo || '',
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get all users
router.get('/me', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }
  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId)
    .select('name photo role email');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ name: user.name || '', photo: user.photo || '',
       role: user.role, email: user.email });
  } catch (err) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
});

export default router;
