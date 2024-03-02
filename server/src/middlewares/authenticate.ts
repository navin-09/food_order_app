// middleware/authenticate.ts

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ message: "Authorization token is missing" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");
    req.userId = (decoded as any).userId;
    next();
  } catch (error) {
    console.error("Error decoding token:", error);
    res.status(401).json({ message: "Invalid token" });
  }
};

export default authenticate;
