/**Import app to run server */
const app = require("./src/app")
/**Port */
const port = 3000;

/**Run server */
app.listen(port,()=>{
  console.log(`The Server is running on port ${port}`);
})
