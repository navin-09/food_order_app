import { Request, Response } from "express";
import { prisma } from "../utils/prismaHelper";
import logger from "../logger";

export const fetchDishes = async (req: Request, res: Response) => {
  try {
    logger.info("fetching all dishes...");
    const dishes = await prisma.dish.findMany();
    logger.info("fetching.... all dishes...", { dishes });
    res.status(201).json({ success: true, data: dishes });
  } catch (error) {
    logger.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Function to create a new dish
export const createDish = async (req: Request, res: Response) => {
  try {
    const { name, price, cuisine, type, subCategory, description, image } =
      req.body;
    logger.info("Creating dish...", {
      name,
      price,
      cuisine,
      type,
      subCategory,
      description,
      image,
    });

    // Create the dish in the database
    const newDish = await prisma.dish.create({
      data: {
        name,
        price,
        cuisine,
        type,
        subCategory,
        description,
        image,
      },
    });

    logger.info("Dish created successfully", { newDish });
    res.status(201).json({ success: true, data: newDish });
  } catch (error) {
    logger.error("Error creating dish:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const fetchDish = async (req: Request, res: Response) => {
  try {
    logger.info("fetching the dish by id...");
    const { id } = req.params;
    const data = await prisma.dish.findUnique({ where: { id } });
    return res.status(200).json({ success: true, data });
  } catch (error) {
    logger.error("Error signing in:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
