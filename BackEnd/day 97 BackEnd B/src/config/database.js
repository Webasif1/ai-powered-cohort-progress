/**Config dotenv */
require("dotenv").config()
/**Require mongoose from mongoose to connect db */
const mongoose = require("mongoose");


/**Create database fnc */
function connectToDB(){
  mongoose.connect(process.env.MONGO_URI)
  .then(()=>{
    console.log("Connected to mongodb");
  })
}

/**Export connectToDB fnc */
module.exports = connectToDB
