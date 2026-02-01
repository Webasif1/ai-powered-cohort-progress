/**Require dotenv */
require("dotenv").config()
/**Require Mongoose */
const mongoose = require("mongoose")

/**connectToDb and mongoose fnc */
function connectToDb(){
  mongoose.connect(process.env.MONGO_URI)
  .then(()=>{
    console.log("Database is connected");
  })
}


/**connectToDb fnc export */
module.exports = connectToDb
