import mongoose from "mongoose";

const DB_NAME = "BULMA_BACKEND"


const connectDB = async () =>{

  try {

    const connectionInstance = await mongoose.connect(`${process.env.DATABASE_URI}/${DB_NAME}`)
    
  } catch (error) {
    
    console.log("Error occur at  mongoose connection",error)
    process.exit(1)
  }
}

export default connectDB