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


export const createDish = async (req: Request, res: Response) => {
  try {
    const dishes = req.body;

    if (!Array.isArray(dishes)) {
      return res.status(400).json({
        error: "Invalid request format. Please provide an array of dishes.",
      });
    }

    const createdDishes = [];
    for (const dishData of dishes) {
      const { name, price, cuisine, type, subCategory, description, image } =
        dishData;

      logger.info("Creating dish...", {
        name,
        price,
        cuisine,
        type,
        subCategory,
        description,
        image,
      });

      try {
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

        createdDishes.push(newDish);
        logger.info("Dish created successfully", { newDish });
      } catch (error) {
        logger.error(
          `Error creating dish (data: ${JSON.stringify(dishData)}):`,
          error
        );
        return res.status(500).json({ error: "Internal Server Error" });
      }
    }

    res.status(201).json({ success: true, data: createdDishes });
  } catch (error) {
    logger.error("Error creating dishes:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
  return;
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
