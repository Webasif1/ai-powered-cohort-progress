/**
 * Require express to create userRouter
 */
const express = require("express");
/**
 * Import followUserController
 */
const { followUserController } = require("../controllers/user.controller");
/**
 * Import identifyUser from ../middlewares/auth.middleware
 */
const identifyUser = require("../middlewares/auth.middleware")
/**
 * userRouter
 */
const userRouter = express.Router();

/**
 * @route Post /api/users/follow/:username
 * @description Follow a user
 * @access private
 */
userRouter.post("/follow/:username", identifyUser, followUserController)

/**
 * module.exports = userRouter
 */
module.exports = userRouter;
