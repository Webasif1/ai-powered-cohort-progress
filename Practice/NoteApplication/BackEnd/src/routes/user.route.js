/**Require express */
const express = require("express");
/**Require jwt */
const jwt = require("jsonwebtoken")
/**Require cookie */
const cookie = require("cookie")
/**Require crypto to hash password */
const crypto = require("crypto")
/**Import userModel */
const userModel = require("../models/user.model");

/**create authRouter */
const authRouter = express.Router()

/**Create User Register api */
authRouter.post("/register", async(req , res)=>{
  //Request name, email and password from body
  const {name, email, password} = req.body;

  //isUserAlreadyExist
  const isUserAlreadyExist = await userModel.findOne({email});
  if(isUserAlreadyExist){
    return res.status(400).json({
      message:"With this email user already exist"
    })
  }

  //Create hash password
  const hashPassword = crypto.createHash("md5").update(password).digest("hex")

  //Create user
  const user = await userModel.create({
    name,
    email,
    password:hashPassword
  });

  //Jwt_token
  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET
  )

  //Cookie set
  res.cookie("jwt_token", token);

  //send status
  res.status(201).json({
    message:"User registered successfully",
    user
  })
})

/** module.exports authRouter */
module.exports = authRouter
