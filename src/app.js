import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import UserRouter from "./routes/user.route.js";
import eventRouter from "./routes/event.route.js";

const app = express();

app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true, limit:"16kb"}));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname,"../public")));
app.use(cookieParser());


app.use("/api/v1/users",UserRouter);
app.use("/api/v1/events", eventRouter);







export default app