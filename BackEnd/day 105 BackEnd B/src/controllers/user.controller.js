/**
 * Import follow model form ../models/follow.model
 */
const followModel = require("../models/follow.model")

/**
 * followUserController function
 * @param {*} req
 * @param {*} res
 */
async function followUserController(req, res) {
  const followerUsername = req.user.username
  const followeeUsername = req.params.username

  if(followerUsername === followeeUsername){
    return res.status(400).json({
      message: "You can not follow yourself"
    })
  }

  const isAlreadyFollow = await followModel.findOne({
    follower: followerUsername,
    followee:followeeUsername
  })
  if(isAlreadyFollow){
    return res.status(200).json({
      message:`You are already following ${followeeUsername}`
    })
  }

  const followRecord = await followModel.create({
    follower: followerUsername,
    followee: followeeUsername
  })

  res.status(201).json({
    message:`You are now following ${followerUsername}`,
    follow: followRecord
  })
}


/**
 * module.exports = followUserController
 */
module.exports = {
  followUserController
}
