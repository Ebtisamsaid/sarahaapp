import express from "express"
import Bootstrap from "./src/app.controller.js"
const app = express()
const port = process.env.port 
await Bootstrap(app,express)
app.listen(port, () => console.log(`saraha app listening on port ${port}!`))