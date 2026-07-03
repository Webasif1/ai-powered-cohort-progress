import express, { type Request, type Response } from "express";

const app = express();


app.get("/", (req: Request, res: Response)=>{
  res.send({
    success:true,
    message: "Tyne cats backend running...."
  })
})


export default app;
