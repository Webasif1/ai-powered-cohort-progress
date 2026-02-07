/**Config dotenv */
require("dotenv").config()
/**Import app to run the serer */
const app = require("./src/app")
/**Import connectToDB fnc to connect mongodb data base */
const connectToDB = require("./src/config/database")


/**Set the port for the server */
const PORT = process.env.PORT || 3000;

/**Call connectToDB fnc */
connectToDB()

/**Create app.listen api to run server*/
app.listen(PORT,()=>{
  console.log(`The server is running on port : ${PORT}`);
})
