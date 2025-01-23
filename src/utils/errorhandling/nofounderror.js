const notfounderror=(req,res,next)=>{
    next(new Error("api is not found",{cause:400}))

}
export default notfounderror