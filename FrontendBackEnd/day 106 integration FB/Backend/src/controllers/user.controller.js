/**
 * Import follow model form ../models/follow.model
 */
const followModel = require("../models/follow.model")
/**
 * Import user model form ../models/user.model
 */
const userModel = require("../models/user.model")

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

  const isFolloweeExist = await userModel.findOne({
    username: followeeUsername
  })
  if(!isFolloweeExist){
    return res.status(404).json({
      message:"User your trying to follow does not exist"
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
 * unFollowUserController function
 */
async function unFollowUserController(req,res){
  const followerUsername = req.user.username
  const followeeUsername = req.params.username


  const isUserFollowing = await followModel.findOne({
    follower: followerUsername,
    followee: followeeUsername,
  })

  if(!isUserFollowing){
    return res.status(200).json({
      message:`Your are not following ${followeeUsername}`
    })
  }

  await followModel.findByIdAndDelete(isUserFollowing._id)

  res.status(200).json({
    message: `You have unfollow ${followeeUsername}`
  })
}

/**
 * module.exports = followUserController
 */
module.exports = {
  followUserController,
  unFollowUserController
}
