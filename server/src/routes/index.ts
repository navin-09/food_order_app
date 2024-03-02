import express from "express";
import userRoutes from "./userRoutes";
import logRequestAndResponseTime from "../utils/requestLogger";
const router = express.Router();

router.use(logRequestAndResponseTime);
router.use("/", userRoutes);

export default router;
