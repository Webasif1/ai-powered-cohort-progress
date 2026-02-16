/**Require app  */
const app = require("./src/app")


/**
 * -Create Listen api to run the server
 */
app.listen(3000,()=>{
  console.log(`The server is running on port: 3000`);
})
