/**
 * -Require express to create routes
 */
const express = require("express");
/**
 * -Import userModel
 */
const userModel = require("../models/user.model");
/**
 * Require crypto
 */
const crypto = require("crypto");
/**
 * Require jsonwebtoken
 */
const jwt = require("jsonwebtoken");

/**
 * -Create authRouter
 */
const authRouter = express().Routes();

/**
 * /api/auth/register
 */
authRouter.post("/register", async (req, res) => {
  // Bring data from body
  const { username, email, password, bio, profilePicture } = res.body;

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

  //Hash password
  const hash = crypto.createHash("sha265").update(password).digest("hex");

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
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
});
