const app = require("./src/app");
const connectToDb = require("./src/config/database")
const port = 3000;


connectToDb();


app.listen(port,()=>{
  console.log(`The server is running on port ${port}`);
})
