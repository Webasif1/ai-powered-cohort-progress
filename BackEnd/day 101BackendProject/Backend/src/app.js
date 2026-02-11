/**Require express */
const express = require("express");
/**Require cookie parser */
const cookieParser = require("cookie-parser");
/**Import authRouter */
const authRoute = require("./routes/auth.route")


/** Create app variable */
const app = express();


/**Use express json */
app.use(express.json());
/**Use cookie parser */
app.use(cookieParser());

/**Use authRoute */
app.use("/api/auth", authRoute)

/**Module.exports */
module.exports = app;
