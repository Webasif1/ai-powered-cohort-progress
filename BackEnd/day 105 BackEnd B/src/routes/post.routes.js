/**
 * Require express for create postRouter
 */
const express = require("express");
/**
 * Require multer for upload file
 */
const multer = require("multer")
const upload = multer({storage: multer.memoryStorage()})
/**
 * Import createPostController
 */
const {createPostController} = require("../controllers/post.controller")
/**
 * Create postRouter
 */
const postRouter = express.Router();

/**
 * Post/api/posts/
 * req.body = {caption, imageFile}
 */
postRouter.post("/", upload.single("image"), createPostController)

/**module.exports = postRouter */
module.exports = postRouter
