/***Import post model */
const postModel = require("../models/post.model");
/***Import like model */
const likeModel = require("../models/like.model");
/**
 * REquire imageKit to cloud store image-video
 */
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");

/**
 * imageKit
 */
const imageKit = new ImageKit({
  privateKey: process.env.ImageKit_PRIVATE_KEY,
});

/**
 *createPostController
 *-
 */
async function createPostController(req, res) {
  const file = await imageKit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "Test",
    folder: "cohort2",
  });

  const post = await postModel.create({
    caption: req.body.caption,
    imgUrl: file.url,
    user: req.user.id,
  });

  res.status(201).json({
    message: "Post created successfully",
    post,
  });
}

/**
 * getPostController
 */
async function getPostController(req, res) {
  const userId = req.user.id;

  const posts = await postModel.find({
    user: userId,
  });

  res.status(201).json({
    message: "Posts fetched successfully.",
    posts,
  });
}

/**
 * getPostDetails
 */
async function getPostDetailsController(req, res) {
  const userId = req.user.id;
  const postId = req.params.postId;
  const post = await postModel.findById(postId);

  if (!post) {
    return res.status(404).json({
      message: "Post not found.",
    });
  }

  const isValidUser = post.user.toString() === userId;
  if (!isValidUser) {
    return res.status(403).json({
      message: "Forbidden content.",
    });
  }

  res.status(200).json({
    message: "Post fetched successfully.",
    post,
  });
}

/**
 * likePotController
 */
async function likePotController(req, res) {
  const username = req.user.username;
  const postId = req.params.postId;

  const post = await postModel.findById(postId);
  if (!post) {
    return res.status(404).json({
      message: "Post not found",
    });
  }

  const like = await likeModel.create({
    post: postId,
    user: username,
  });

  res.status(200).json({
    message: "Post liked successfully",
    like,
  });
}

/**
 * getFeedController
 */
async function getFeedController(req, res) {

  const user = req.user
  const posts = await Promise.all((await postModel.find().populate("user").lean())
  .map(async (post)=>{
    const isLiked = await likeModel.findOne({
      user:user.username,
      post:post._id
    })
    post.isLiked = !!isLiked

    return post
  }));

  res.status(200).json({
    message: "post fetch successfully",
    posts,
  });
}

/**module.exports = createPostController */
module.exports = {
  createPostController,
  getPostController,
  getPostDetailsController,
  likePotController,
  getFeedController,
};
