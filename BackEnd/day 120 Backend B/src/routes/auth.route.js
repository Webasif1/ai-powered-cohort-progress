import { Router } from "express";
import { registerValidator } from "../validator/auth.validator";
import { register } from "../controllers/auth.controller";

const authRouter = Router();

authRouter.post("/register", registerValidator, register);

export default authRouter;
