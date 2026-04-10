import mongoose from "mongoose"

const connectToDB= async ()=>{
  try{
    const conn = await mongoose.connect(process.env.MONGODB_URI)
    console.log("Connected to db");
  }catch(err){
    console.log("database connection error:" + err);
  }
}


export default connectToDB
