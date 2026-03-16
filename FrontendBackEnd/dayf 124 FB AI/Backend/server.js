import "dotenv/config"
import app from "./src/app.js";
import connectDB from "./src/config/database.js";

const PORT = process.env.PORT || 8000;


connectDB().catch((err) => {
  console.error("Mongodb connection failed:", err);
  process.exit(1);
});

app.listen(PORT, () => {
  console.log("The server is running on port: "+ PORT);
});
