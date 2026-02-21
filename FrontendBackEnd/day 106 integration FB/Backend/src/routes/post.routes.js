/**
 * Require express for create postRouter
 */
const express = require("express");
/**
 * Require multer for upload file
 */
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
/**
 * Import createPostController
 */
const {
  createPostController,
  getPostController,
  getPostDetailsController,
  likePotController
} = require("../controllers/post.controller");
/**
 * Import identifyUser from ../middlewares/auth.middleware
 */
const identifyUser = require("../middlewares/auth.middleware")
/**
 * Create postRouter
 */
const postRouter = express.Router();

/**
 * Post/api/posts/
 * req.body = {caption, imageFile}
 */
postRouter.post("/", upload.single("image"), identifyUser, createPostController);

/**
 * Get /api/posts/ [Protected]
 */
postRouter.get("/", identifyUser, getPostController);

/**
 * Get / api/posts/details/:postid
 * -return an detail about specific post with the post id. Also check whether the post belongs to the user that is requesting come from
 */
postRouter.get("/details/:postId", identifyUser, getPostDetailsController);
/**
 * Get / api/post/like/:postid
 * Like post with the id provided in the request params
 */
postRouter.post("/like/:postId", identifyUser, likePotController);

/**module.exports = postRouter */
module.exports = postRouter;
