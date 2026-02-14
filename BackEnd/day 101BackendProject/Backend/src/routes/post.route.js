/**Require express */
const express = require("express");
/**Import post controllers */
const { createPostController, getPostsController } = require("../controllers/post.controller");
/**Create post routes */
const postRoute = express.Router();
/**Create post route */
postRoute.post("/create", createPostController);
/**Get posts route */
postRoute.get("/get", getPostsController);
/**Module.export postRoute */
module.exports = postRoute;

