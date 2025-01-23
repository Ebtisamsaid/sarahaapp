import EventEmitter from "events"
import { generatetoken } from "../token/token.js"
import { sendEmail, subject } from "./sendEmail.js"
import { generateHtml } from "./htmlgenerate.js"

export const eventEmmiter=new EventEmitter()
eventEmmiter.on("sendEmail", async(email)=>{
 const token=generatetoken({payload:{email}})
    const link=`http://localhost:6000/auth/acctivate-account/${token}`
    const isSent = await sendEmail({to:email,subject:subject.register,html:generateHtml(link)})
})