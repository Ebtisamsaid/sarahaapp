import nodemailer from "nodemailer"
import {generateHtml} from "../sendEmail/htmlgenerate.js"
export const subject={
    register:'acctivate account',
    resetpass:"reset password"
}
export const sendEmail=async({to,subject,html})=>{
   
    
    // sender
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for port 465, false for other ports
        auth: {
          user: process.env.user_email,
          pass: process.env.app_password,
        },
      });
    //   receiver
    const info = await transporter.sendMail({
        from: `"saraha app👻" <${process.env.user_email}>`, // sender address
        to, // list of receivers
        subject, // Subject line
        text: "welcome ", // plain text body
        html// html body
      });
      console.log(info);
      
}