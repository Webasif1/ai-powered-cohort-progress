import { Router } from "express";
import { validateRegister } from "../validator/auth.validator.js";
import { registerController } from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/register", validateRegister, registerController)



export default authRouter
