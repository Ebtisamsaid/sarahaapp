import bcrypt from "bcrypt"
export const hash=({plaintext,Rounds=Number(process.env.Rounds)})=>{
   return bcrypt.hashSync(plaintext,Rounds)

}

export const comparesync=({plaintext,hash})=>{
  return  bcrypt.compareSync(plaintext,hash)
}