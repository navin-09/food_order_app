import express from "express";
import {
  addDishCart,
  fetchCart,
  updateDishCart,
  deleteDishCart,
} from "../controllers/CartController";

const router = express.Router();
router.get("/cart/:id", fetchCart);
router.post("/cart/:dishId", addDishCart);
router.put("/cart/:dishId", updateDishCart);
router.delete("/cart/:dishId/:userId/:id", deleteDishCart);

export default router;
