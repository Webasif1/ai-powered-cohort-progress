/**
 * Require mongoose to create follow Schema
 */
const mongoose = require("mongoose")

/**
 * Follow Schema
 */
const followSchema = new mongoose.Schema({
  follower:{
    type: String,
  },
  followee:{
    type: String,
  },
},{
  timestamps:true
})

/**
 * Follow model
 */
const followModel = mongoose.model("follows", followSchema)

/**
 * module.exports = followModel
 */
module.exports = followModel
