import express from "express";
import { fetchCart, handleDishCart } from "../controllers/CartController";

const router = express.Router();
router.get("/cart/:userId", fetchCart);
router.post("/cart", handleDishCart);
export default router;
