/**Require mongoose */
const mongoose = require("mongoose")


/**Create Schema */
const userSchema = new mongoose.Schema({
  name:String,
  email:{
    type:String,
    unique:[true,"With this email user already exist"]
  },
  password:String
})

/**Create user model */
const userModel = mongoose.model("userModel", userSchema);

/**Export userSchema */
module.exports = userModel
