import express from "express";
import {
  addDishCart,
  fetchCart,
  updateDishCart,
  deleteDishCart,
  handleDishCart,
} from "../controllers/CartController";

const router = express.Router();
router.get("/cart/:userId", fetchCart);
router.post("/cart/:dishId", addDishCart);
router.put("/cart/:dishId", updateDishCart);
router.delete("/cart/:dishId/:userId/:id", deleteDishCart);
router.post("/cart", handleDishCart);
export default router;
