/**Require express  */
const express = require('express');
/**Require cookie */
const cookieParser = require("cookie-parser")


/**Create app variable  */
const app = express()

/**
 * Middleware
 */
app.use(express.json())
app.use(cookieParser())

//***Require routes */
/**
 * Import authRouter from ./routes/auth.routes
 */
const authRouter = require("./routes/auth.routes")
/**
 * Import postRouter from ./routes/post.routes
 */
const postRouter = require("./routes/post.routes")
/**
 * Import userRouter from ./routes/user.routes
 */
const userRouter = require("./routes/user.routes")

//**using routes */
/**
 * Create /api/auth for authRouter
 */
app.use("/api/auth", authRouter)
/**
 * Create /api/posts for postRouter
 */
app.use("/api/posts", postRouter)
/**
 * Create /api/users for userRoute
 */
app.use("/api/users", userRouter)


/**
 * -Module.exports app to run server in server.js
 */
module.exports = app
