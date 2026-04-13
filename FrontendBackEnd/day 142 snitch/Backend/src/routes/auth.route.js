import { Router } from "express";
import passport from "passport";
import { validateRegister } from "../validator/auth.validator.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import {
  registerController,
  loginController,
  getMeController,
  googleCallback,
} from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/register", validateRegister, registerController);
authRouter.post("/login", loginController);
authRouter.get("/get-me", authMiddleware, getMeController);

//google

authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:5173/login",
    session: false,
  }),
  googleCallback,
);

export default authRouter;
