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
  return;
};

export const signin = async (req: Request, res: Response) => {
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
    return;
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Server error" });
  }
  return;
};

export const test = (req: Request, res: Response) => {
  const body = req.body;
  console.log({ body });

  res.status(200).json({ success: true, message: "hello world" });
};
