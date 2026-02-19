/**dotenv */
require("dotenv").config()
/**Require app  */
const app = require("./src/app")
/**Connect to DB Function */
const connectToDB = require("./src/config/database")


/**
 * -Call connectToDB to Connect ot mongodb
 */
connectToDB()
/**
 * -Create Listen api to run the server
 */
app.listen(3000,()=>{
  console.log(`The server is running on port: 3000`);
})
