import express, {Router} from "express";
import { login, logout, signup } from "../controllers/user.controller.js";
import { isAuthenticated } from "../middleware/authmiddleware.js";

const router = express.Router();

router.post("/signup", signup)
router.post("/login", login)
router.post("/logout", isAuthenticated,logout)

export default router;
