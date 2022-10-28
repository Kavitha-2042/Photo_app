import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        requird:true
    },
    password:{
        type:String,
        required:true
    }
})

export default mongoose.model("User_Details", userSchema)