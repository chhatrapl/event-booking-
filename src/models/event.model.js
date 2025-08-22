import mongoose, { Schema } from "mongoose";

const eventSchema = new Schema({
    title:{
        type:String,
        require:true
    },
    discription:{
        type:String,
        require:true
    },
    Date:{
        type:Date,
        require:true,
    },
    location:{
            type:String,
            require:true
    },
    price:{
        type:Number,
        require:true
    },
    totalTikets :{
        type:Number,
        require:true
    },
    soldTikets:{
        type:Number,
        default:0
    }
},{timestamps:true})

export const Event = mongoose.model("Event", eventSchema);