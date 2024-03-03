import express from "express";
import {
  createOrders,
  fetchOrders,
  fetchOrdersById,
} from "../controllers/OrderController";

const router = express.Router();

router.post("/orders", createOrders);
router.get("/orders", fetchOrders);
router.get("/orders/:id", fetchOrdersById);

export default router;
