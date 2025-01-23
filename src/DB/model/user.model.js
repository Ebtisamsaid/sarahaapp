import mongoose, { Schema, Types } from "mongoose";
export const roles={
    user:"user",
    admin:"admin"
}
const userSchema=new Schema({
   name:String,
    email:{type:String,required:true,unique:[true,"email is aleady exist"],lowerCase:true,match:/^[\w-\.]+@(\w){3,10}\.\w{2,5}$/},
    password:{type:String,required:true},
    phone:{type:String,required:true},
    isActivate:{type:Boolean,default:false},
    role:{type:String,enum:Object.values(roles)},
    changepasswordAt:Date,
    isDelete:{type:Boolean,default:false}

},{timestamps:true})

const User=mongoose.model("user",userSchema)
export default User