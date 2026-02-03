/**Import app to run server */
const app = require("./src/app")
/**Import connectToDb function to call it */
const connectToDb = require("./src/config/database")
/**Port */
const port = process.env.PORT || 3000;


/**Call connectToDb function for connect to Mongodb Database */
connectToDb()

/**Run server */
app.listen(port,()=>{
  console.log(`The Server is running on port ${port}`);
})
