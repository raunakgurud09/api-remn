import mongoose from 'mongoose';
import config from '../configs/index.config';
import dotenv from "dotenv"

dotenv.config()

function connectDB() {
  const dbUrl = config.dbUriCloud as string;
  // const dbUrl = process.env.CLOUD_DBURL as string;
  mongoose.set("strictQuery", false);
  return mongoose.connect(dbUrl, {}).then(()=>{
    console.log("database connected")
  }).catch((error)=>{
    console.log(error)
    process.exit(1)
  })
}

export default connectDB