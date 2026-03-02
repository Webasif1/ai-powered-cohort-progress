const express = require("express");

const authRouter = express.Router();

const {
  authController,
  loginController,
  getMeController,
} = require("../controller/auth.controller");

const { authUser } = require("../middleware/auth.middleware");

authRouter.post("/register", authController);
authRouter.post("/login", loginController);
authRouter.get("/get-me", authUser, getMeController);

module.exports = authRouter;
