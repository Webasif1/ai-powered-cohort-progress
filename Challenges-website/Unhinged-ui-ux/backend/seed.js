import mongoose from "mongoose";
import { config } from "./src/config/config.js";
import Product from "./src/model/product.model.js";
import products from "./src/utils/send.js";

const seedDB = async () => {
  try {
    // 1. Connect to the database
    const conn = await mongoose.connect(config.MONGOOSE_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);

    // 2. Clear existing products
    await Product.deleteMany({});
    console.log("🧹 Cleared existing products");

    // 3. Insert new products
    await Product.insertMany(products);
    console.log("🌱 Database successfully seeded!");

    // 4. Exit the process successfully
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding Error:", error.message);
    process.exit(1);
  }
};

seedDB();
