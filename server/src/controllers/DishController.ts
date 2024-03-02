// DishController.ts

import { Request, Response } from "express";
import Dish from "../models/Dish";

export const createDish = async (req: Request, res: Response) => {
  try {
    const { name, description, price } = req.body;
    const newDish = await Dish.create({ name, description, price });
    res
      .status(201)
      .json({ message: "Dish created successfully", dish: newDish });
  } catch (error) {
    console.error("Error creating dish:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getDishes = async (req: Request, res: Response) => {
  try {
    const dishes = await Dish.find();
    res.status(200).json(dishes);
  } catch (error) {
    console.error("Error fetching dishes:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateDish = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, price } = req.body;
    const updatedDish = await Dish.findByIdAndUpdate(
      id,
      { name, description, price },
      { new: true }
    );
    if (!updatedDish) {
      return res.status(404).json({ message: "Dish not found" });
    }
    res
      .status(200)
      .json({ message: "Dish updated successfully", dish: updatedDish });
  } catch (error) {
    console.error("Error updating dish:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteDish = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedDish = await Dish.findByIdAndDelete(id);
    if (!deletedDish) {
      return res.status(404).json({ message: "Dish not found" });
    }
    res
      .status(200)
      .json({ message: "Dish deleted successfully", dish: deletedDish });
  } catch (error) {
    console.error("Error deleting dish:", error);
    res.status(500).json({ message: "Server error" });
  }
};
