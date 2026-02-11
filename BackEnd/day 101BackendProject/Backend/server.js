/**Import app */
const app = require("./src/app")
/**Import connectToDB function */
const connectToDB = require("./src/config/database")


/**Connect to database */
connectToDB();

/**Run server */
app.listen(8080,()=>{
  console.log(`The server is running on port : 8080`);
})
