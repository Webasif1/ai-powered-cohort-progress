import { Router } from "express";
import { validateRegister } from "../validator/auth.validator.js";
import {
  registerController,
  loginController,
} from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/register", validateRegister, registerController);
authRouter.post("/login", loginController);

export default authRouter;
