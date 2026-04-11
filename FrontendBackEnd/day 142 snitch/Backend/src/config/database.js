import mongoose from "mongoose";
import { config } from "./config.js";

const connectToDB = async () => {
  try {
    const conn = await mongoose.connect(config.MONGO_URI);
    console.log("Connected to db");
  } catch (err) {
    console.log("database connection error:" + err);
  }
};

export default connectToDB;
