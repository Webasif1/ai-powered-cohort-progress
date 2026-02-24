/**
 * Require mongoose to create post Schema
 */
const mongoose = require("mongoose");

/**
 * Create postSchema
 */

const postSchema = new mongoose.Schema({
  caption: {
    type: String,
    default: "",
  },
  imgUrl: {
    type: String,
    required: [true, "imgUrl is require for create a post"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: [true, "User id is require for create a post"],
  },
});

/**
 * create postModel
 */
const postModel = mongoose.model("post", postSchema);

/**Module.exports postModel */
module.exports = postModel;
