import connectDB from "./DB/connection.js"
import notfounderror from "./utils/errorhandling/nofounderror.js"
import authRouter from "./modules/auth/auth.controller.js"
import {globalhandlingerror} from "./utils/errorhandling/globalErrorhandling.js"
import userRouter from "./modules/user/user.controller.js"
import messageRouter from "./modules/message/message.controller.js"
import cors from "cors"
const Bootstrap= async(app,express)=>{
    // parser
app.use(express.json())
app.use(cors())
// connectDB
await connectDB()
// home route
app.get("/",(req,res,next)=>{
    return res.status(200).json({message:"hello on app saraha"})
})
// router
app.use("/auth",authRouter)
app.use("/user",userRouter)
app.use("/message",messageRouter)
app.all("/*",notfounderror)
app.use(globalhandlingerror)
}
export default Bootstrap