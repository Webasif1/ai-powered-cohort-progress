/**
 * Require mongoose to create follow Schema
 */
const mongoose =require("mongoose")

/**
 * Follow Schema
 */
const followSchema = new mongoose.Schema({
  follower:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"users",
    required: [true, "Follower is required"]
  },
  followee:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"users",
    required: [true, "Followee is required"]
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
