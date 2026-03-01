const express = require("express");

const authRouter = express.Router();

const {
  authController,
  loginController,
} = require("../controller/auth.controller");

authRouter.post("/register", authController);
authRouter.post("/login", loginController);

module.exports = authRouter;
