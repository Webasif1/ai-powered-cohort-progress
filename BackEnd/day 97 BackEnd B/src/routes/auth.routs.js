/**Dotenv   */
require("dotenv").config();
/**Require express router */
const express = require("express");
/**Require jwt */
const jwt = require("jsonwebtoken");
/**Require crypto */
const crypto = require("crypto")
/**Import userModel */
const userModel = require("../models/user.model");

/**Create authRouter for authentication routes */
const authRouter = express.Router();

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 */
/**Route for user registration */
authRouter.post("/register", async (req, res) => {
  //Request body destructuring name, email, password
  const { name, email, password } = req.body;

  //Check if user with the same email already exists in the database
  const isUserAlreadyExists = await userModel.findOne({ email });

  if (isUserAlreadyExists) {
    return res.status(400).json({
      message: "User with this email already exists",
    });
  }

  //Hash pass
  const hash =  crypto.createHash("md5").update(password).digest("hex")

  //Create new user in the database
  const newUser = await userModel.create({ name, email, password:hash });

  /**Generate JWT token for the new user */
  const token = jwt.sign(
    {
      id: newUser._id,
      email: newUser.email,
    },
    process.env.JWT_SECRET,
  );

  //Set token in cookie
  res.cookie("jwt_token", token);

  //Send response with the created user
  res.status(201).json({
    message: "User registered successfully",
    newUser,
    token,
  });
});
/**
 * api/auth/login
 */
authRouter.post("/login", async (req, res) => {
  //Request body destructuring email, password
  const { email, password } = req.body;

  //Find user base on email
  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(404).json({
      message: "User not found with this email",
    });
  }

  //password check
  const isPasswordMatched = user.password === crypto.createHash("md5").update(password).digest("hex");
  if (!isPasswordMatched) {
    return res.status(401).json({
      message: "Invalid password",
    });
  }

  //Create jwt_token
  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
  );
  //set token in cookie
  res.cookie("jwt_token", token);

  //status
  res.status(200).json({
    message: "User logged in",
    user,
  });
});

/**export authRouter */
module.exports = authRouter;
