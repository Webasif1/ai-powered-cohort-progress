import express, { type Request, type Response } from "express";
import catsRoute from "./routes/cats.route.ts";
import aiRoute from "./routes/ai.route.ts";
import aiRecommendRoute from "./routes/aiRecommend.route.ts";
import mcpRoutes from './routes/test-mcp.route.ts'

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send({
    success: true,
    message: "Tyne cats backend running....",
  });
});

app.use("/api/cats", catsRoute);
app.use("/api/ai", aiRoute);
app.use("/api/aiRecommend", aiRecommendRoute);
app.use("/api/mcp",mcpRoutes)

export default app;
