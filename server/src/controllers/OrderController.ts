import { Request, Response } from "express";
import { prisma } from "../utils/prismaHelper";
import logger from "../logger";

export const createOrders = async (req: Request, res: Response) => {
  try {
    const { userId, items } = req.body;
    console.log({ userId, items });
    // Find the user placing the order
    const user = await prisma.user.findUnique({ where: { id: userId } });
    console.log({ user });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let totalPrice = 0;
    for (const item of items) {
      const dish = await prisma.dish.findUnique({ where: { id: item.dishId } });

      if (!dish) {
        return res.status(404).json({ message: "Dish not found" });
      }
      const itemPrice = dish.price * item.quantity;
      totalPrice += itemPrice;
      item.price = itemPrice;
    }
    console.log({ totalPrice });

    // Create a new order
    const order = await prisma.order.create({
      data: {
        user: { connect: { id: userId } },
        items: {
          createMany: {
            data: items.map((item: any) => ({
              dishId: item.dishId,
              quantity: item.quantity,
              price: item.quantity * item.price, // Include the calculated price
            })),
          },
        },
        totalPrice,
        status: "PENDING", // Initial status could be different based on requirements
      },
    });
    await prisma.cartDish.deleteMany({ where: { Cart: { userId } } });
    // await prisma.cart.deleteMany({ where: { Cart: { userId } } });

    return res.json(order);
  } catch (error) {
    logger.error("Error creating order:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
  return;
};

export const fetchOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const orders = await prisma.order.findMany({
      where: { userId },
      include: { items: { include: { dish: true } } },
    });

    return res.json(orders);
  } catch (error) {
    logger.error("Error fetching orders", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
  return;
};

export const fetchOrdersById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log({});
    // Check if the order belongs to the user
    const order = await prisma.order.findUnique({
      where: { id },
      include: { user: true },
    });
    if (!order) {
      return res
        .status(404)
        .json({ message: "Order not found or not owned by user" });
    }

    return res.json(order);
  } catch (error) {
    logger.error("Error fetching order:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
  return;
};
