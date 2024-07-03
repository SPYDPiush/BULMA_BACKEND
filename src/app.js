import express from "express"
import cors from 'cors';
import cookieParser from "cookie-parser";


const app  = express()


app.use(cors({
  origin:process.env.ORIGIN,
  credentials:true
}))

app.use(cookieParser())

app.use(express.static("Public"))


// router setting 

import { userRouter } from "./routers/user.router.js";


app.use('/user',userRouter)

export default app

