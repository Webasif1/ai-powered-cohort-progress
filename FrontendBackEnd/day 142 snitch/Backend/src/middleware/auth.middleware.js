import { config } from "../config/config.js";
import jwt from "jsonwebtoken";
import userModel from "../models/user.models.js";

export async function authMiddleware(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
      success: false,
      error: "Unauthorized",
    });
  }
  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
}

export async function authenticateSeller(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
      success: false,
      error: "Unauthorized",
    });
  }
  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);
    const id = decoded.id;
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
        error: "User not found",
      });
    }
    if (user.role !== "seller") {
      return res.status(403).json({
        message: "Forbidden",
        success: false,
        error: "Forbidden",
      });
    }
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
}
