import mongoose from "mongoose"
const connectDB=async()=>{
    await mongoose.connect(process.env.uri_online).then(()=>{console.log("DB connect successfully") }).catch((error)=>{console.log("error in connect with DB",error.messaga);
    })
}
export default connectDB