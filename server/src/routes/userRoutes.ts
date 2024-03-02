import express from "express";
import { signup, signin, test } from "../controllers/UserController";

const router = express.Router();
router.get("/test", test);
router.post("/test", test);
router.post("/signup", signup);
router.post("/login", signin);

export default router;
