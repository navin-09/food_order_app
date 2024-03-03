import express from "express";
import userRoutes from "./userRoutes";
import dishesRoutes from "./dishesRoutes";
import logRequestAndResponseTime from "../utils/requestLogger";
const router = express.Router();
router.use(logRequestAndResponseTime);
router.use("/", userRoutes);
router.use("/", dishesRoutes);

export default router;
