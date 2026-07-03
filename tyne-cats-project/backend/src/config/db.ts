import mongoose from "mongoose"

export const connectToDB = async ()=>{
  try {
    await mongoose.connect(String(process.env.MONGO_DB))
    console.log("Mongodb connected")
  } catch (error) {
    console.log("error in mongodb", error)
  }
};
