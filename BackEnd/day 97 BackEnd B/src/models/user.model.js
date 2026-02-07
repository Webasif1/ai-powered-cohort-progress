/**Require mongoose from mongoose to create user Schema */
const mongoose = require("mongoose");


/**Define user Schema */
const userSchema = new mongoose.Schema({
  name:String,
  email:{
    type:String,
    unique: [true,'With this email user already exist please try another one']
  },
  password:String,
})


/**Create userModel */
const userModel = mongoose.model("userModel",userSchema)

/**Export userModel */
module.exports = userModel
