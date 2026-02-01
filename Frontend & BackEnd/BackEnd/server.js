/**Export app to run the server*/
const app = require("./src/app");
/**Export database fnc */
const connectToDb = require("./src/config/database")


/**Port */
const port = 3000;

/**ConnectToDb */
connectToDb()

// Run the server
app.listen(port,()=>{
  console.log(`The server is running on port: ${port}`);
})
