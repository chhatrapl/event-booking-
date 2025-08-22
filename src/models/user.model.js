import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    role:{
        type:String,
        enum:["user", "admin"],
        default:"user"
    }
},{timestamps:true})

export const User = mongoose.model("User", userSchema);