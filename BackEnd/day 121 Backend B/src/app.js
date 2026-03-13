import express from "express";
import cookie from "cookie-parser";
import authRouter from "./routes/auth.route.js";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookie());

app.get("/", (req, res) => {
  res.json({ message: "Server is running" });
});

app.use("/api/auth", authRouter)

export default app;
