/***Import post model */
const postModel = require("../models/post.model")
/**
 * REquire imageKit to cloud store image-video
 */
const ImageKit = require("@imagekit/nodejs")
const {toFile} = require("@imagekit/nodejs")

/**
 * imageKit
 */
const imageKit = new ImageKit({
  privateKey:process.env.ImageKit_PRIVATE_KEY
})

/**
 *createPostController
 *-
 */
async function createPostController(req,res){
  console.log(req.body, req.file)

  const file = await imageKit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer),"file"),
    fileName:"Test"
  })

  res.send(file)
}


/**module.exports = createPostController */
module.exports = {
  createPostController
}
