import { Router } from "express";
import { validateRegister } from "../validator/auth.validator.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import {
  registerController,
  loginController,
  getMeController,
} from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/register", validateRegister, registerController);
authRouter.post("/login", loginController);
authRouter.get("/get-me", authMiddleware, getMeController);

export default authRouter;
