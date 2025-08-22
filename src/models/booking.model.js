import mongoose, { Schema } from "mongoose";

const bookingSchema = new Schema ({
    user:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        require:true
    },
    event:{
        type:mongoose.Types.ObjectId,
        ref:"Event"
    },
    quantity:{
        type:Number,
        require:true,
        min:1,
        max:2
    },
    paymentStatusbar:{
        type:String,
        enum:["pending", "successfull", "faild"],
        default:"pending"
    }
},{timestamps:true});

export const Booking = mongoose.model("Booking",bookingSchema);