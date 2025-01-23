import Joi from "joi";
import { Types } from "mongoose";

export const MessageValidation =Joi.object({
    body:Joi.string().required(),
    sender:Joi.custom((value,helper)=>{
        if(Types.ObjectId.isValid(value))
            return true
        return helper.message("invalid objectid ")
    }).required(),
    receiver:Joi.custom((value,helper)=>{
        if(Types.ObjectId.isValid(value))
            return true
        return helper.message("invalid objectid ")
    }).required(),
}).required()

 export const flags={
    inbox:"inbox",
    outbox:"outbox"

}
export const getallmesgval=Joi.object({
    flag:Joi.string().valid(...Object.values(flags)).required()
}).required()