import { Request, Response } from "express";
import { prisma } from "../utils/prismaHelper";
import logger from "../logger";

export const fetchDishes = async (req: Request, res: Response) => {
  try {
    logger.info("fetching all dishes...");
    res.status(201).json({ success: true });
  } catch (error) {
    logger.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const fetchDish = async (req: Request, res: Response) => {
  try {
    logger.info("fetching the dish by id...");

    return res.status(200).json({ success: true });
  } catch (error) {
    logger.error("Error signing in:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
