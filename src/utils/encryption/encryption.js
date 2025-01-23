import CryptoJS from "crypto-js"
export const ciphertext=({encrypttext,secret_key=process.env.secret_key})=>{
  return   CryptoJS.AES.encrypt(encrypttext,secret_key).toString()

}
export const decrypt=({ciphertext,secret_key=process.env.secret_key})=>{
return CryptoJS.AES.decrypt(ciphertext,secret_key).toString(CryptoJS.enc.Utf8)
}