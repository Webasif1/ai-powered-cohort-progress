/**Require mongoose */
const mongoose = require("mongoose")


/**User Schema */

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
    default: "https://ik.imagekit.io/webasifdotio/user_image.jpg"
  },
  followers:[{
    type:mongoose.Schema.Types.ObjectId,
    ref: "users"
  }],
  following:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  }]
})

/**Create user model */
const userModel = mongoose.model("User", userSchema)

/**Export User model */
module.exports= userModel
