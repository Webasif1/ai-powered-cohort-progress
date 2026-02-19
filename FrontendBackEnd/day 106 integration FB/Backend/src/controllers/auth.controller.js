/**
 * -Import userModel
 */
const userModel = require("../models/user.model");
/**
 * Require crypto for hash password
 */
const crypto = require("crypto");
/**
 * Require jsonwebtoken to create token
 */
const jwt = require("jsonwebtoken");

/**
 * Require bcryptjs to hash password more easy way
 */
const bcrypt = require("bcryptjs")

/**
 * registerController
 */
async function registerController (req, res) {
  // Bring data from body
  const { username, email, password, bio, profilePicture } = req.body;

  /*** =====Bad Code===
   //Check isUserExistingByEmail
  const isUserExistingByEmail = await userModel.findOne({email})

  //Condition for create user email
  if(isUserExistingByEmail){
    return res.status(409).json({
      message: "User already exist with this email"
    })
  }

  //Check isUserExistingByUsername
  const isUserExistingByUsername = await userModel.findOne({username})

  //Condition for create user username
  if(isUserExistingByUsername){
    return res.status(409).json({
      message:"User already exist with this username"
    })
  }
  */

  //Check isUserAlreadyExist
  const isUserAlreadyExist = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  //Condition
  if (isUserAlreadyExist) {
    return res.status(409).json({
      message:
        isUserAlreadyExist.email === email
          ? "User already exist with this email"
          : "User already exist with this username",
    });
  }

  //Hash password with crypto
  // const hash = crypto.createHash("sha256").update(password).digest("hex");
  //Hash password with bcryptjs
  const hash = await bcrypt.hash(password, 10)

  //Create user
  const user = await userModel.create({
    username,
    email,
    bio,
    profilePicture,
    password: hash, //Save password as a hash
  });

  //sign jwt token
  /**
   *user data
   *data should be unique
   */
  const token = jwt.sign(
    {
      id: user._id,
      username: user.username
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  //Set cookie
  res.cookie("token",token)

  //send status
  res.status(201).json({
    message:"User Register Successfully",
    user:{
      username:user.username,
      email:user.email,
      bio:user.bio,
      profilePicture:user.profilePicture
    }
  })
}


/**
 * loginControllers
 */
async function loginController (req,res){
  //Bring data from body
  const {username ,email ,password}= req.body

  //Find user

  /**
   * login user base on
   * -username
   * -password
   *
   * -email
   * -password
   */

  const user = await userModel.findOne({
    $or:[
      {username:username},
      {email:email}
    ]
  })

  //if user not found
  if(!user){
    return res.status(404).json({
      message:"User not found"
    })
  }

  //if user found check hash password
  //*** const hash = crypto.createHash("sha256").update(password).digest("hex")
  // compare hash pass to body pass
  //*** const isPasswordValid = hash === user.password
  //Compare password with bcrypt
  const isPasswordValid = await bcrypt.compare(password, user.password)
  // if password is not valid
  if(!isPasswordValid){{
    return res.status(401).json({
      message:"Invalid password"
    })
  }}

  // if every think match create token
  const token = jwt.sign(
    {
      id:user._id,
      username: user.username
    },
    process.env.JWT_SECRET,
    {expiresIn:"1d"}
  )

  // set token in cookie
  res.cookie("token",token)


  // send status
  res.status(200).json({
    message:"User logged in successfully",
    user:{
      username:user.username,
      email:user.email,
      bio:user.bio,
      profilePicture:user.profilePicture
    }
  })
}


/**
 * module.exports
 */

module.exports = {
  registerController,
  loginController
}
