import joi from "joi"
import { roles } from "../../DB/model/user.model.js"

    
   export const registerSchema = joi.object({
    name:joi.string().required(),
        email:joi.string().email().required(),
        password:joi.string().required(),
        confirmPassword:joi.string().valid(joi.ref("password")).required(),
        phone:joi.string().regex(/^01[0124][0-9]{8}$/).required(),
role:joi.string().valid(...Object.values(roles))

    }).required()

    export const updatePassValidation=joi.object({
        old_password:joi.string().required(),
        new_password:joi.string().required(),
        confirm_password:joi.string().valid(joi.ref("new_password")).required()
    }).required()