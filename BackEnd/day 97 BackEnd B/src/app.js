/**Require express from express */
const express = require("express");
/**Cookie parser */
const cookieParser = require("cookie-parser")
/**Import authRouter */
const authRouter = require("./routes/auth.route")

/**Create app variable */
const app = express();

/****Middleware to parse JSON request body */
app.use(express.json())
/**Middleware public directory */
app.use(express.static('public'));
/**Middleware to parse cookies */
app.use(cookieParser())

/****Use authRouter for authentication routes */
app.use("/api/auth", authRouter)

/**Module.exports app for run server in server.js */
module.exports = app
