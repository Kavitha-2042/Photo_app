import mongoose from "mongoose";

export const fileSchema = new mongoose.Schema({
    image:{
        type:String
    }
})

export default mongoose.model("fileDetails",fileSchema)