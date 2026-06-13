import mongoose from "mongoose";

const connectDB = async ()=> {
  try{
    const URI = process.env.MONGO_URI
    if(!URI) return;
    await mongoose.connect(URI)
  }catch(error){
    console.log("error in connecting db:", error);
  }
}

export default connectDB;
