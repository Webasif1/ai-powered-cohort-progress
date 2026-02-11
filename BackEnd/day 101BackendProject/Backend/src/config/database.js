/**dotenv */
require("dotenv").config()
/**Require mongoose */
const mongoose = require("mongoose");

/**Create connectToDB function */
function connectToDB(){
  mongoose.connect(process.env.MONGO_URI)
  .then(()=> console.log("Connected to MongoDB"))
  .catch((err) => console.log(err))
}

/**Export connectToDB function */
module.exports = connectToDB;
