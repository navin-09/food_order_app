import express from "express";
import {
  fetchDishes,
  fetchDish,
  createDish,
} from "../controllers/DishesController";
const router = express.Router();
router.get("/dishes", fetchDishes);
router.post("/dishes", createDish);
router.post("/dishes/:id", fetchDish);

export default router;
