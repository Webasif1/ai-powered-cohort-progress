import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

async function sendTokenResponse(user, res, message) {
  const token = jwt.sign(
    {
      id: user._id,
    },
    config.JWT_SECRET,
    { expiresIn: "7d" },
  );

  res.cookie("token", token);

  res.status(200).json({
    message,
    success: true,
    user: {
      id: user._id,
      email: user.email,
      contact: user.contact,
      fullName: user.fullName,
      role: user.role,
    },
  });
}

export async function registerController(req, res) {
  const { email, contact, password, fullName, isSeller } = req.body;

  try {
    const isUsrAlreadyExist = await userModel.findOne({
      $or: [{ email }, { contact }],
    });

    if (isUsrAlreadyExist) {
      return res.status(409).json({
        message: "User already exist with this email or phone number",
        success: false,
        error: "User already exist",
      });
    }
    const user = await userModel.create({
      email,
      contact,
      password,
      fullName,
      role: isSeller ? "seller" : "buyer",
    });

    await sendTokenResponse(user, res, "User Register Successfully");
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
}

export async function loginController(req, res) {
  const { email, contact, password } = req.body;
  try {
    const user = await userModel.findOne({
      $or: [{ email }, { contact }],
    });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
        error: "User not found",
      });
    }
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid password",
        success: false,
        error: "Invalid password",
      });
    }
    await sendTokenResponse(user, res, "User Login Successfully");
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
}
