/**dotenv */
require("dotenv").config()
/**Import app to run server */
const app = require("./src/app")
/**Import connectToDB */
const connectToDB = require("./src/config/database");
/**PORT */
const PORT = process.env.PORT || 3000;


/**Call connectToDB */
connectToDB();

/**Run server */
app.listen(PORT, ()=>{
  console.log(`The server is running on port:${PORT}`);
})
