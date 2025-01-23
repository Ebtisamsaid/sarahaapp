import User from "../../DB/model/user.model.js"
import { hash } from "../../utils/hash/hash.js"
import {ciphertext} from "../../utils/encryption/encryption.js"
import bcrypt from "bcrypt"
import {comparesync} from "../../utils/hash/hash.js"
import {generatetoken, verifytoken} from "../../utils/token/token.js"
import { sendEmail, subject } from "../../utils/sendEmail/sendEmail.js"
import { generateHtml } from "../../utils/sendEmail/htmlgenerate.js"
import { eventEmmiter } from "../../utils/sendEmail/email.event.js"

export const register =async(req,res,next)=>{
    const {password,name,email,phone,role,confirmPassword}=req.body
    const user = await User.create({...req.body,password:hash({plaintext:req.body.password}), phone:ciphertext({encrypttext:req.body.phone })})

    if(!user) return next(new Error ("email is invalid",{cause:400}))
       
    eventEmmiter.emit("sendEmail",email)
    return res.status(200).json({success:true,message :"user created successfully"})


}
export const login=async (req,res,next)=>{
const {password,email}=req.body
const user =await User.findOne({email})
if(!user) return next(new Error ("invalid email",{cause:400}))
    if(!user.isActivate) return next(new Error ("tou must active your account first",{cause:400}))

    const match =comparesync({plaintext:req.body.password,hash:user.password})
if(!match) return next(new Error ("password  incorrect",{cause:400}))
    const token=generatetoken({payload:{email:user.email,id:user._id}})

return res.status(200).json({success:true,message:"login successfully",token:token})

}

export const isacctivate =async(req,res,next)=>{
    const {token} =req.params
    if(!token) return next(new Error ("invalid token ",{cause:400}))
  const {email}=  verifytoken(token,process.env.jwt_key )
  const user =await User.findOne({email})
  if(!user)return next(new Error ("email is not exist ",{cause:400}))
user.isActivate=true
  await user.save()
  return res.status(200).json({success:true,message:"you can login now",user})
}
export const updatepassword=async(req,res,next)=>{
  const{old_password,new_password}=req.body
  // check password
  const checkpass=await comparesync({plaintext:old_password,hash:req.user.password})
  if(!checkpass)return next(new Error ("invalid password",{cause:400}))
  const newpasshash=  await hash({plaintext:new_password})

  
  const user=await User.findByIdAndUpdate(req.user._id,{password: newpasshash,changepasswordAt:Date.now()},{new:true})
  return res.status(200).json({success:true,message:"password updated successfully"})
}
// -----freeze account-----
export const freezeAccount=async(req,res,next)=>{

  const user =await User.findByIdAndUpdate(req.user._id,{isDelete:true},{new:true})
  
return res.status(200).json({success:true,message:"account is deleted",user})

}