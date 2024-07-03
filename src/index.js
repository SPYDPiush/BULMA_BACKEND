import app from "./app.js";
import connectDB from "./db/index.js";
import dotenv from "dotenv"

dotenv.config({
  path:'./.env'
})


connectDB().then( () => {
  app.listen(process.env.PORT || 4040, (req,res) => {

    console.log(`app is listen at ${process.env.PORT}`) 
  })
})
.catch((err) => {
  console.log("MongoDb connection failed in index file: ",err)
})