/**dotenv */
require("dotenv").config()
/**Require Mongoose */
const mongoose = require("mongoose");


/**Create connectToDB Function */
function connectToDB(){
  mongoose.connect(process.env.MONGO_URI_USER)
  .then(()=> console.log("Mongodb connected for users"))
  .catch((err)=> console.error('MongoDB connection error:', err))
}

/**Module.exports */
module.exports = connectToDB
