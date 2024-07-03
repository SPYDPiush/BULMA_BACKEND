import { User } from "../models/user.models.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";


const userLogin = asyncHandler(
   
  async (req,res) => {

    // take input from frontend user
    // check neccessary data recieved or not
    // validate them the user is present or not in database
    // check password is correct or not
    // all correct return user info

    const {email,password} = req.body

    console.log(req.body)

    if(!email || !password){
      throw apiError(401,"email and password both are required")
    }

    const existedUser = await User.findOne({email})

    if(!existedUser){
      throw apiError(401,"existedUser not present")
    }

    if(existedUser.password != password){
      throw new apiError(401,"enter password incorrect")
    }

    const user = await User.findById(existedUser._id).select(" -password ")

    if(!user){
      throw new apiError(401,"unauthorized user")
    }

    return res.status(200).json(new apiResponse(200,"user login successfully",user))
  }
)


const userRegister = asyncHandler( async (req,res) => {

    // take input from frontend side 
    // check all required data recieved or not
    // if all data recieved then push on models
    // send response to frontend with user details but remove password 


    console.log(req.body)

    const {username,email,password,FullName} = req.body;

  //   {
  //     "username":"abc",
  //     "FullName":"abc123",
  //     "password":"1234",
  //     "email":"abc@gmail.com"
  // }

    if(!username || !email || !password || !FullName){
      throw new apiError(401,"all required data need to fill")
    }

    const existUser = await User.findOne({email})

    if(!existUser){
      throw new apiError(401,"Email already used")
    }

    const userRegister = await User.create({
      email,
      username,
      FullName,
      password
    })

    const user = await User.findById(userRegister._id).select(" -password ")

    if(!user){
      throw new apiError(401,"User not found")
    }

    return res.status(200).json(new apiResponse(200,"User register successfully",user))
  }
)


export {userLogin,userRegister}