import { Event } from "../models/event.model.js";

export const createEvent = async (req, res)=>{
    let {title, discription, Date, price, location, totalTikets} = req.body;
    console.log(title, discription, Date, price, location, totalTikets);

    if ([title, discription, Date, price, location, totalTikets].some(field => typeof field !== "string" || field.trim() === "")) {
        console.log("All fields must be valid strings");
        return res.status(400).json({ success: false, message: "All fields must be non-empty strings" });
    }


   try {
      const event = await Event.create({
         title, 
         discription, 
         Date, 
         price, 
         location, 
         totalTikets
      }) 
 
      return res.status(201).json({
         success:true,
         message:"Event crated successfully",
         event:event
      })
   } catch (error) {
       return res.status(500).json({
        success:false,
        message:"Event not created!",
        error:error.message || error.toString()
       })
   }

};