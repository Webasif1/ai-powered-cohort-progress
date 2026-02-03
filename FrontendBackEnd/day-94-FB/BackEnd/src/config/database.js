/**Require Mongoose form Mongoose */
const mongoose = require("mongoose")
/**Require dotenv for secret uri */
require("dotenv").config()

/**Connect to database function */
function connectToDb(){
  mongoose.connect(process.env.MONGOOSE_URI)
  .then(()=>{
    console.log("Mongodb connected successfully!");
  })
}

/**module.exports connectToDb function */
module.exports = connectToDb
