import message from "../../DB/model/message.model.js";
import User from "../../DB/model/user.model.js";
import { ciphertext, decrypt } from "../../utils/encryption/encryption.js";
import { verifytoken } from "../../utils/token/token.js";

export const profile=async(req,res,next)=>{


 const user=req.user

 const phone=decrypt(user.phone)
 console.log(phone);
 
 
return res.status(200).json({success:true,result:{...user,phone}})
}


// -------------------update profile-------------------------------------
export const updateprofile=async(req,res,next)=>{

    let{phone ,name}=req.body
    phone=await ciphertext({encrypttext:req.body.phone})
    const user =await User.findByIdAndUpdate(req.user._id,req.body,{new:true}
)

return res.status(200).json({success:true,message:"profile updated successfully"})

}
export const shareprofile=async(req,res,next)=>{
 


    const user=await User.findById(req.params.id).select(`name email phone -_id`).lean()
 const phone =await decrypt({ciphertext:user.phone})

   
if(!user) return next(new Error("user not found",{cause:401}))
    return res.status(200).json({success:true,message:"done",user:{...user,phone}})
}