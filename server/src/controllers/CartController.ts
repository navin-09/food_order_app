import { Request, Response } from "express";
import { prisma } from "../utils/prismaHelper";
export const fetchCart = async (req: Request, res: Response) => {
  try {
    // Get the user ID from the authenticated user
    const { id } = req.params;
    console.log({ id });

    // // Find the cart associated with the user
    const cart = await prisma.cart.findUnique({
      where: { id },
      include: { items: true },
    });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    return res.json(cart);
    return;
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const addDishCart = async (req: Request, res: Response) => {
  try {
    const { dishId, quantity, userId } = req.body;

    // Check if the dish exists
    const dish = await prisma.dish.findUnique({ where: { id: dishId } });
    if (!dish) {
      return res.status(404).json({ message: "Dish not found" });
    }

    // Find the user's cart or create a new one if it doesn't exist
    let cart = await prisma.cart.findUnique({ where: { userId } });
    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId },
      });
    }

    // Check if the item already exists in the cart
    const existingItem = await prisma.cartDish.findFirst({
      where: { cartId: cart.id, dishId },
    });

    if (existingItem) {
      // Update the quantity of the existing item
      await prisma.cartDish.update({
        where: { id: existingItem.id },
        data: { quantity: quantity + existingItem.quantity },
      });
    } else {
      // Create a new cart item
      await prisma.cartDish.create({
        data: { cartId: cart.id, dishId, quantity },
      });
    }

    return res.json({ message: "Item added to cart" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateDishCart = async (req: Request, res: Response) => {
  try {
    const { dishId, quantity, userId } = req.body;

    // Check if the dish exists
    const dish = await prisma.dish.findUnique({ where: { id: dishId } });
    if (!dish) {
      return res.status(404).json({ message: "Dish not found" });
    }

    // Find the user's cart
    const cart = await prisma.cart.findUnique({ where: { userId } });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Find the cart item
    const cartItem = await prisma.cartDish.findFirst({
      where: { cartId: cart.id, dishId },
    });

    if (!cartItem) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    // Update the quantity of the cart item
    await prisma.cartDish.update({
      where: { id: cartItem.id },
      data: { quantity },
    });

    return res.json({ message: "Item quantity updated" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteDishCart = async (req: Request, res: Response) => {
  try {
    const { dishId, userId, id } = req.params;

    // Find the user's cart
    const cart = await prisma.cart.findUnique({ where: { id, userId } });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Find the cart item
    const cartItem = await prisma.cartDish.findFirst({
      where: { cartId: cart.id, dishId },
    });

    if (!cartItem) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    // Delete the cart item
    await prisma.cartDish.delete({ where: { id: cartItem.id } });

    return res.json({ message: "Item removed from cart" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
