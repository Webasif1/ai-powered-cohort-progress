/**Dotenv   */
require("dotenv").config()
/**Require express from express to create authRouter*/
const express = require("express");
/**Require jwt form jsonwebtoken */
const jwt = require("jsonwebtoken");
/**Import userModel */
const useModel = require("../models/user.model");
const userModel = require("../models/user.model");

/**Create authRouter */
const authRouter = express.Router();

/**Create User
 * @route POST api/auth/register
 * @route for user registration
 */
authRouter.post("/register", async (req, res) => {
  //Destructuring name , email and password from body
  const { name, email, password } = req.body;

  //Check if user with the same email already exists in the database
  const isUserAlreadyExists = await userModel.findOne({email})
  if(isUserAlreadyExists){
    return res.status(409).json({
      message:"User with this email already exists",
    })
  }

  //Generate JWT token for the new user
  const token = jwt.sign(
    {
      id: user.id,
      email:user.email
    },
    process.env.JWT_SECRET
  )

  //Set jwt_token in cookies
  res.cookie("JWT_TOKEN",token)

  //Create userModel
  const user = await useModel.create({ name, email, password });

  //Response Status
  res.status(201).json({
    message : "User registered Successfully",
    user,
    token
  })
});


/**export authRouter */
module.exports = authRouter
