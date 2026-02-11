/**Require mongoose */
const mongoose = require("mongoose");

/**Create user schema */
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [ true, "Username is required"],
    unique: [true, "Username must be unique"]
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email must be unique"]
  },
  password: {
    type: String,
    required: [true, "Password is required"]
  },
  bio: {
    type: String,
    default: ""
  },
  profilePicture: {
    type: String,
    default: ""
  }
})

/**Create user model */
const userModel = mongoose.model("User", userSchema)

/**Export user model */
module.exports = userModel;
