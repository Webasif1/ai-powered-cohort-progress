/**Import app */
const app = require("./src/app")



/**Run server */
app.listen(8080,()=>{
  console.log(`The server is running on port : 8080`);
})
