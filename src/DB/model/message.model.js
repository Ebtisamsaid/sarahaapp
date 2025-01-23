import mongoose, { Schema, Types } from "mongoose"
// message schema
const messageSchema=new Schema({
    body:{type:String,required:true}  ,
    sender: {type:Types.ObjectId,ref:"user",required:true} ,
    receiver: {type:Types.ObjectId,ref:"user",required:true}  ,
},{timestamps:true})

// message model 
const message=mongoose.model("message",messageSchema)
export default message