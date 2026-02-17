/**Require express  */
const express = require('express');
/**Require cookie */
const cookieParser = require("cookie-parser")

/**Import authRouter from ./routes/auth.routes */
const authRouter = require("./routes/auth.routes")

/**Create app variable  */
const app = express()

/**
 * Middleware
 */
app.use(express.json())
app.use(cookieParser())


/**
 * Create /api/auth for authRouter
 */
app.use("/api/auth", authRouter)
/**
 * -Module.exports app to run server in server.js
 */
module.exports = app
