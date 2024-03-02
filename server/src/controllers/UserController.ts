import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";

export const signup = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  try {
    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);
    // Create a new user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Error signing up user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }
    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1h" }
    );
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// UserController.ts

export const resetPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Generate a temporary password
    const temporaryPassword = generateTemporaryPassword();
    // Update the user's password
    user.password = temporaryPassword;
    await user.save();
    // Send the temporary password to the user via email or other means
    sendTemporaryPasswordEmail(user.email, temporaryPassword);
    res.status(200).json({ message: "Temporary password sent to your email" });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Utility function to generate a temporary password
const generateTemporaryPassword = (): string => {
  // Generate a random string or use a library like crypto to generate a secure temporary password
  return Math.random().toString(36).substring(2, 10);
};

// Utility function to send temporary password via email (example)
const sendTemporaryPasswordEmail = (
  email: string,
  temporaryPassword: string
) => {
  // Implement email sending logic here (e.g., using Nodemailer)
};
