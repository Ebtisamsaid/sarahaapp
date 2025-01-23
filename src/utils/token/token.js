import jwt from "jsonwebtoken"
export const generatetoken=({payload},signature=process.env.jwt_key)=>{
    return  jwt.sign(payload,signature)

}
export const verifytoken=(generatetoken,signature=process.env.jwt_key)=>{
    return jwt.verify(generatetoken,signature)
}