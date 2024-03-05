import { Request, Response } from "express";
import { prisma } from "../utils/prismaHelper";

export const fetchCart = async (req: Request, res: Response) => {
  try {
    // Get the user ID from the authenticated user
    const { userId } = req.params;
    console.log({ userId });

    // // Find the cart associated with the user
    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: { items: { include: { dish: true } } },
    });

    if (!cart) {
      return res.status(200).json({
        success: true,
        cart: { items: [] },
        message: "Cart not found",
      });
    }

    return res.json(cart);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const handleDishCart = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { dishId, quantity, userId } = req.body;
    console.log({ dishId, quantity, userId });

    // Check if the dish exists
    const dish = await prisma.dish.findUnique({ where: { id: dishId } });
    if (!dish) {
      res.status(404).json({ message: "Dish not found" });
      return;
    }
    console.log({ dish });

    // Find the user's cart or create a new one if it doesn't exist
    let cart = await prisma.cart.findUnique({ where: { userId } });
    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId },
      });
    }

    // Find the cart item
    const cartItem = await prisma.cartDish.findFirst({
      where: { cartId: cart.id, dishId },
    });

    if (quantity > 0) {
      // If quantity is greater than zero, add or update the item
      if (cartItem) {
        // Update the quantity of the cart item
        await prisma.cartDish.update({
          where: { id: cartItem.id },
          data: { quantity },
        });
      } else {
        // Create a new cart item
        await prisma.cartDish.create({
          data: { cartId: cart.id, dishId, quantity },
        });
      }
      res.json({ message: "Item added to cart" });
    } else {
      // If quantity is zero, delete the item if it exists
      if (cartItem) {
        // Delete the cart item
        await prisma.cartDish.delete({ where: { id: cartItem.id } });
        res.json({ message: "Item removed from cart" });
      } else {
        res.json({ message: "Item not in cart" });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
  return;
};
