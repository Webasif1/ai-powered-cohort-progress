const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, " Username is required"],
    unique: [true, "Username Should me unique"]
  },
  email: {
    type: String,
    required: [true, " Email is required"],
    unique: [true, "Email Should me unique"]
  },
  password: {
    type: String,
    required: [true, "Password is required"]
  },
  bio: {
    type: String,
    default: ""
  },
  profileImage: {
    type: String,
    default: "https://ik.imagekit.io/webasifdotio/user_image.jpg"
  }
})

const userModel = mongoose.model("users", userSchema)

module.exports = userModel
