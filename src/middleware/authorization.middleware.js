import { roles } from "../DB/model/user.model.js"

export const isAuthorized=(roles)=>{
    return (req,res,next)=>{
  
        
        if(req.user.role !== roles.user)
            return  next(new Error ("you not allowed ",{cause:400}))
         return next()

    }
     

}