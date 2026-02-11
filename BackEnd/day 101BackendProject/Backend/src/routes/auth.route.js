/**Require dotenv */
require("dotenv").config();
/**Require express router */
const express = require("express");
/**Import auth controllers */
const { registerController, loginController } = require("../controllers/auth.controller");
/**Create authentication routes */
const authRoute = express.Router();

/**Register route */
authRoute.post("/register", registerController);

/**Login route */
authRoute.post("/login", loginController);

/**Module.export authRoute */
module.exports = authRoute;
