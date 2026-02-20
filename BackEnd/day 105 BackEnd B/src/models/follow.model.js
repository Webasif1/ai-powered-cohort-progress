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
 * Create follow index
 */
followSchema.index({follower: 1, followee: 1}, { unique: true })

/**
 * Follow model
 */
const followModel = mongoose.model("follows", followSchema)

/**
 * module.exports = followModel
 */
module.exports = followModel
