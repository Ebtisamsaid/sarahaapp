import User from "../DB/model/user.model.js"
import { verifytoken } from "../utils/token/token.js"

  const isAuthenticated= async(req,res,next)=>{
    try{
 const {authorization}=req.headers
//    console.log(authorization);
   
    if(!authorization || !authorization.startsWith('Bearer'))
        return next(new Error("token is required",{cause:403}))
    const token =authorization.split(" ")[1]
    // console.log(token);
    
   
    
   const {id,email,iat}=verifytoken(token,process.env.jwt_key)

const user =await User.findById(id).lean()
if(!user) return next(new Error ("you are not allowed register now",{cause:400}))
    if(user?.isDelete) return next(new Error ("this account is deleted",{cause:401}))

    
     if(parseInt(user?.changepasswordAt.getTime() /1000) > iat) return next(new Error("token is expire pls login again",{cause:400}))
    req.user=user

return next()
    }catch(error){
        next(error)
    }

}
export default isAuthenticated
