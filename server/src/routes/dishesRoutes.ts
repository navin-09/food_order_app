import express from "express";
import { fetchDishes, fetchDish } from "../controllers/DishesController";

const router = express.Router();

router.post("/dishes", fetchDishes);
router.post("/dishes/:id", fetchDish);

export default router;
