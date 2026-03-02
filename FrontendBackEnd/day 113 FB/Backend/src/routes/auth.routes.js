const express = require("express");

const authRouter = express.Router();

const {
  authController,
  loginController,
  getMeController,
  logoutController,
} = require("../controller/auth.controller");

const { authUser } = require("../middleware/auth.middleware");

authRouter.post("/register", authController);
authRouter.post("/login", loginController);
authRouter.get("/get-me", authUser, getMeController);
authRouter.get("/logout", logoutController)

module.exports = authRouter;
