import Joi from "joi";

export const updateprofile=
   Joi.object({
        name: Joi.string() ,
        phone: Joi.string().regex(/^01[0124][0-9]{8}$/)  ,

    }).required()
