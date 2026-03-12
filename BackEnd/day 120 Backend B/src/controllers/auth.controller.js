import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { sendEmail } from "../services/mail.service.js";

export async function register(req, res) {
  const { username, email, password } = req.body;

  const isUserAlreadyExist = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserAlreadyExist) {
    return res.status(409).json({
      message: "With this email or username user already exist",
      success: false,
      err: "User already exist",
    });
  }

  const user = await userModel.create({ username, email, password });

  await sendEmail({
    to: email,
    subject: "Welcome to perplexity",
    text: `Welcome ${username}`,
    html: `<h2>Welcome to Perplexity</h2>
          <p>Hi ${username},</p>

          <p>
          Thanks for registering. Your account has been successfully created.
          </p>

          <hr/>
          <p>Perplexity Team</p>`,
  });

  res.status(200).json({
    message: "User has been created successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
}
