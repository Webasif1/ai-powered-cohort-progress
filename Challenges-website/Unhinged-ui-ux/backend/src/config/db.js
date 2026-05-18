//Import mongoose to connect to the database
import mongoose from "mongoose";
import { config } from "./config.js";

// ============================================
// Database Connection & diconnection functions
// ============================================
const connectToDB = async () => {
  try {
    const conn = await mongoose.connect(config.MONGOOSE_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    // Uncomment these lines if you need to seed the database again
    // await Product.deleteMany({});
    // await Product.insertMany(products);
    // console.log("Seeded!");
    // process.exit();
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    throw error;
  }
};

const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    console.log("✅ MongoDB Disconnected");
  } catch (error) {
    console.error("❌ Disconnect Error:", error.message);
    process.exit(1);
  }
};

export { connectToDB, disconnectDB };
