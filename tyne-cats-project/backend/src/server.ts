import dotenv from "dotenv";
dotenv.config();
import app from "./app.ts";
import { connectToDB } from "./config/db.ts";


connectToDB();

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`)
})
