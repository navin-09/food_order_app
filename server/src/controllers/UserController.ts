import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../utils/prismaHelper";
import logger from "../logger";
const jwtSecretKey = process.env.JWT_SECRET_KEY || "";
const accessTokenExpiresIn = "1h";
const refreshTokenExpiresIn = "7d";

export const signup = async (req: Request, res: Response) => {
  try {
    logger.info("Signing up a new user");
    const { full_name, email, password }: any = req.body;
    console.log({ full_name, email, password });
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }, // Convert email to lowercase
    });

    if (existingUser) {
      res.sendStatus(409); // Conflict
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        full_name,
        email: email.toLowerCase(), // Convert email to lowercase
        password: hashedPassword,
      },
    });

    res.status(201).json({ success: true, user });
  } catch (error) {
    logger.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const signin = async (req: Request, res: Response) => {
  try {
    logger.info("Signing in user");
    const { email, password } = req.body;
    console.log({ email, password });
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }, // Convert email to lowercase
    });
    console.log({ user });
    if (!user) {
      return res.status(401).json({ error: "Invalid Email Or Password" });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user?.password || ""
    );
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid Email Or Password" });
    }

    const accessToken = jwt.sign(
      { email: user?.email, id: user?.id },
      jwtSecretKey,
      {
        expiresIn: accessTokenExpiresIn,
      }
    );

    const refreshToken = jwt.sign(
      { email: user?.email, id: user?.id },
      jwtSecretKey,
      {
        expiresIn: refreshTokenExpiresIn,
      }
    );

    return res
      .status(200)
      .json({ success: true, user, accessToken, refreshToken });
  } catch (error) {
    logger.error("Error signing in:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
