/**
 * -Require express to create routes
 */
const express = require("express");

/**
 * Import registerController,loginController
 */
const {registerController,loginController} = require("../controllers/auth.controller")

/**
 * -Create authRouter
 */
const authRouter = express.Router();


/**
 * Post /api/auth/register
 */
authRouter.post("/register", registerController);

/**
 * Post /api/auth/login
 */
authRouter.post("/login", loginController)

/**
 * module.exports
 */
module.exports = authRouter
