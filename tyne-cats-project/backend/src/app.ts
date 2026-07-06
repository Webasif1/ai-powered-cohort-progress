import express, { type Request, type Response } from "express";
import route from "./routes/cats.route.ts";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send({
    success: true,
    message: "Tyne cats backend running....",
  });
});

app.use("/api/cats/", route);

export default app;
