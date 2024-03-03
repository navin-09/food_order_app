import express from "express";
import {
  fetchDishes,
  fetchDish,
  createDish,
} from "../controllers/DishesController";
const router = express.Router();
router.post("/dishes", createDish);
router.get("/dishes", fetchDishes);
router.get("/dishes/:id", fetchDish);

export default router;
