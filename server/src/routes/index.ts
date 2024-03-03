import express from "express";
import userRoutes from "./userRoutes";
import dishesRoutes from "./dishesRoutes";
import cartRoutes from "./cartRoutes";
import logRequestAndResponseTime from "../utils/requestLogger";
const router = express.Router();
router.use(logRequestAndResponseTime);
router.use("/", userRoutes);
router.use("/", dishesRoutes);
router.use("/", cartRoutes);

export default router;
