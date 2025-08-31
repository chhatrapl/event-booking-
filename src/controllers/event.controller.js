import { Event } from "../models/event.model.js";

export const createEvent = async (req, res) => {
   let { title, discription, Date, price, location, totalTikets } = req.body;
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
         success: true,
         message: "Event crated successfully",
         event: event
      })
   } catch (error) {
      return res.status(500).json({
         success: false,
         message: "Event not created!",
         error: error.message || error.toString()
      })
   }

};

export const deleteEvent = async (req, res) => {
   try {
      const eventid = req.params.id;
      const user = req.user._id;

      const event = await Event.findById(eventid);

      if (!event) {
         return res.json({ message: "there no event!" })
      }

      try {
         const deletedEvent = await Event.findByIdAndDelete(eventid);
         return res.status(200).json({
            success: true,
            message: "event deleted successfully",
         })
      } catch (error) {
         return res.status(404).json({
            success: false,
            message: "event not deleted",
            error: error.message || error.toString()
         })
      }
   } catch (error) {
      return res.status(500).json({
         success: false,
         message: "somthing went wrong",
         error: error.message || error.toString()
      })
   }

}

export const updateEvent = async (req, res) => {
try {
    const eventid = req.params.id;
    const updates = req.body;
   
    if(!updates){
      return res.json(404).json({
         message:"pls fill the details"
      })
    }
   
    const update = await Event.findByIdAndUpdate(
      eventid,
      {$set:updates},
      {new:true, runValidators:true}
    );
   
    return res.status(202).json({
      success:true,
      message:"event updated successfully",
      updatedData:update
    });
} catch (error) {
   return res.status(500).json({
      success:false,
      message:"somthing went wrong",
      error:error.message||error.toString()
   });
};

};