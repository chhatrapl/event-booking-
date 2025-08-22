import dotenv from "dotenv";
dotenv.config();
import app from "./app.js";
import { connectDB } from "./db/db.js";



const port = process.env.PORT || 4000


connectDB()
.then(()=>{
    app.listen(port, ()=>{
        console.log(`server is runnig at port ${port}`);
    })
})
.catch((err)=>{
    console.log(`mongodb connection err`,Error)
})
