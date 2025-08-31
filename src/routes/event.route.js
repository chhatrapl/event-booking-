import express, {Router} from "express"
import { isAuthenticated } from "../middleware/authmiddleware.js";
import { createEvent, deleteEvent, updateEvent } from "../controllers/event.controller.js";
import { isAdmin } from "../middleware/isAdmin.js";

const router = express.Router();

router.post("/createEvent", isAuthenticated,isAdmin,createEvent);
router.delete("/delete/:id", isAuthenticated, isAdmin, deleteEvent);
router.patch("/updateEvent/:id", isAuthenticated,isAdmin, updateEvent)

export default router;