import dotenv from "dotenv";
dotenv.config();

import mongoose  from "mongoose";

export const connectDB = async()=>{
     try {
       const  dbConnection = await mongoose.connect(process.env.MONGODB_URL);
        console.log("mongodb connected")
     } catch (error) {
        console.log("connection faild : ", error)
     }
}