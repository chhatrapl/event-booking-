import express, {Router} from "express"
import { isAuthenticated } from "../middleware/authmiddleware.js";
import { createEvent } from "../controllers/event.controller.js";
import { isAdmin } from "../middleware/isAdmin.js";

const router = express.Router();

router.post("/createEvent", isAuthenticated,isAdmin,createEvent);

export default router;