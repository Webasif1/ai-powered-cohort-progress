const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function authController(req, res) {
  const { username, email, password, bio, profileImage } = req.body;

  const isUserAlreadyExist = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserAlreadyExist) {
    return res.status(409).json({
      message:
        isUserAlreadyExist.email === email
          ? "User already exist with this email"
          : "User already exist with this username",
    });
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    username,
    email,
    bio,
    profileImage,
    password: hash,
  });

  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res.cookie("token", token);
  res.status(201).json({
    message: "User Register Successfully",
    user: {
      username: user.username,
      email: user.email,
      bio: user.bio,
      profilePicture: user.profilePicture,
    },
  });
}

async function loginController(req, res){
  const {username, email, password} = req.body;

  const user = await userModel.findOne({
    $or:[
      {username: username},
      {email: email}
    ]
  })

  if(!user){
    return res.status(404).json({
      message: "User not found"
    })
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)

  if(!isPasswordValid){
    return res.status(401).json({
      message: "Invalid password"
    })
  }

  const token = jwt.sign(
    {
      id:user._id,
      username:user.username
    },
    process.env.JWT_SECRET,
    {expiresIn: "3d"}
  )

  res.cookie("token", token)

  res.status(200).json({
    message: "User logged in successfully",
    user:{
      username: user.username,
      email: user.email,
      bio: user.bio,
      profileImage: user.profileImage
    }
  })
}

module.exports = {
  authController,
  loginController
};
