/**Require express router */
const express = require('express');
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
