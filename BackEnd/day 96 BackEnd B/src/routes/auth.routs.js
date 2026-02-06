/**Dotenv   */
require('dotenv').config();
/**Require express router */
const express = require('express');
/**Require jwt */
const jwt = require('jsonwebtoken');
/**Import userModel */
const userModel = require('../models/user.model');

/**Create authRouter for authentication routes */
const authRouter = express.Router();


/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 */
/**Route for user registration */
authRouter.post('/register', async (req, res) => {
  //Request body destructuring name, email, password
  const { name, email, password } = req.body;

  //Check if user with the same email already exists in the database
  const isUserAlreadyExists = await userModel.findOne({ email });

  if(isUserAlreadyExists) {
    return res.status(400).json({
      message: 'User with this email already exists'
    })
  }

  //Create new user in the database
  const newUser = await userModel.create({ name, email, password });

  //Send response with the created user
  res.status(201).json({
    message: 'User registered successfully',
    newUser
  });
})

/**export authRouter */
module.exports = authRouter;
