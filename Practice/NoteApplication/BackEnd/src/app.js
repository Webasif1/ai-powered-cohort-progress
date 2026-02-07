/**Require express */
const express = require("express");

/**Import authRoute */
const authRouter = require("./routes/user.route")

/**Create app variable */
const app = express();


/**Middleware body parser */
app.use(express.json())


/**user authRoute */
app.use("/api/auth", authRouter)
/**module.exports app */
module.exports = app
