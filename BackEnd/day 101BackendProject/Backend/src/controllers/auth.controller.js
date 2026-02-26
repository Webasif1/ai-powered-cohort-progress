/**Require jwt */
const jwt = require("jsonwebtoken");
/**Require crypto */
const crypto = require("crypto");
/**Require user model */
const userModel = require("../models/user.model");

/**Register logic */
async function registerController(req, res) {
  //Register user info
  const { username, email, password, bio, profilePicture } = req.body;

  //Check if user already exists\
  const isUserAlreadyExist = await userModel.findOne({
    $or: [{ username }, { email }],
  });
  if (isUserAlreadyExist) {
    return res.status(400).json({
      message:
        isUserAlreadyExist.email === email
          ? "Email already exist"
          : "Username already exist",
    });
  }

  const hashedPassword = crypto
    .createHash("sha256")
    .update(password)
    .digest("hex");
  const user = await userModel.create({
    username,
    email,
    password: hashedPassword,
    bio,
    profilePicture,
  });
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.cookie("token", token);

  res.status(201).json({
    message: "User registered successfully",
    user: {
      username: user.username,
      email: user.email,
      bio: user.bio,
      profilePicture: user.profilePicture,
    },
  });
}

/**Login logic */
async function loginController(req, res) {
  //Login user info
  const { username, email, password } = req.body;
  //Check if user exists
  const user = await userModel.findOne({
    $or: [{ username: username }, { email: email }],
  });
  if (!user) {
    return res.status(409).json({
      message: "User not found with this username or email",
    });
  }
  const hashedPassword = crypto
    .createHash("sha256")
    .update(password)
    .digest("hex");

  const isPasswordMatched = user.password === hashedPassword;
  if (!isPasswordMatched) {
    return res.status(400).json({
      message: "Invalid password",
    });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.cookie("token", token);

  res.status(200).json({
    message: "Login successful",
    user: {
      username: user.username,
      email: user.email,
      bio: user.bio,
      profilePicture: user.profilePicture,
    },
  });
}


/**Module.exports */
module.exports = {
  registerController,
  loginController,
};
