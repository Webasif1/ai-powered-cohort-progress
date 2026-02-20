/**
 * Require express to create userRouter
 */
const express = require("express");
/**
 * Import followUserController
 */
const { followUserController, unFollowUserController } = require("../controllers/user.controller");
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
 * @route Post /api/users/unfollow/:username
 * @description Unfollow a user
 * @access private
 */
userRouter.post("/unfollow/:username", identifyUser, unFollowUserController)

/**
 * module.exports = userRouter
 */
module.exports = userRouter;
