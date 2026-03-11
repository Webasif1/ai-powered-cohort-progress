import userModel from "../models/user.model";
import jwt from "jsonwebtoken";

export async function register(res, req) {
  const { username, email, password } = req.body;

  const isUserAlreadyExist = await userModel.findOne({
    $or: {
      username,
      email,
    },
  });

  if(isUserAlreadyExist){
    return res.status(409).json({
      message:"With this email or username user already exist",
      success:false,
      err: "User already exist"
    })
  }
}
