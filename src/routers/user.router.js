import { Router } from "express";
import { userLogin, userRegister } from "../controllers/user.controller.js";


const userRouter  =Router()


userRouter.route('/register').post(userRegister)

userRouter.route('/login').post(userLogin)



export {userRouter}