/***Import post model */
const postModel = require("../models/post.model")
/**
 * jwt
 */
const jwt = require("jsonwebtoken")
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

  const token = req.cookies.token

  if(!token){
    return res.status(401).json({
      message:"Token is not provided, Unauthorized access"
    })
  }

  let decoded = null;
  try{
    decoded = jwt.verify(token, process.env.JWT_SECRET)
  }catch(err){
    res.status(401).json({
      message:"User not authorized"
    })
  }

  const file = await imageKit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName:"Test",
    folder:"cohort2"
  })

  const post = await postModel.create({
    caption:req.body.caption,
    imgUrl:file.url,
    user:decoded.id
  })

  res.status(201).json({
    message:"Post created successfully",
    post
  })
}


/**module.exports = createPostController */
module.exports = {
  createPostController
}
