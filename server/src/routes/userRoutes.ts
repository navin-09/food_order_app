import express from "express";
import { signup, signin,getuserdata } from "../controllers/UserController";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/get_user_data", getuserdata);

export default router;
