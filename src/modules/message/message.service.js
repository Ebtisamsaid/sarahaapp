import message from "../../DB/model/message.model.js"
import User from "../../DB/model/user.model.js"
import { flags } from "./message.validation.js"

export const sendMessage= async(req,res,next)=>{
    // check sender exist
    const {receiver,body,sender}=req.body
    const user =await User.findById(receiver)
    if(!user) return next( new Error ("receiver:not found",{cause:400}))
        await message.create({receiver,body,sender})
    return res.status(200).json({success:true,meesage:"message created successfully"})


}
export const getsingleMessage =
async(req,res,next)=>{
    const {messageid}=req.params
    
  const result=  await message.findById(messageid)

 
    
    if(message.sender != User._id || message.receiver != User._id)
        return next(new Error ("you not allowed ",{cause:400}))
    return res.status(200).json({success:true,result:result})
}

export const getallMessage =
async(req,res,next)=>{
  const {flag}=req.query
  let result
  if(flag == flags.inbox){
    result=  await message.find({receiver:req.user._id})
  }
   result=  await message.find({sender:req.user._id})


    return res.status(200).json({success:true,result:result})
}