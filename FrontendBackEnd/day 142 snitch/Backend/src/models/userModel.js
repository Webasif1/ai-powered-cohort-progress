import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema({
  email: {
    type: String,
    require: [true, "Email is require"],
    unique: [true, "Email should be unique"],
  },
  contact: {
    type: Number,
    require: [true, "Contact number is require"],
    unique: [true, "Contact number should be unique"],
  },
  password: {
    type: String,
    require: [true, "Password is require"],
  },
  fullName: {
    type: String,
    require: [true, "fullName is require"],
  },
  role: {
    type: String,
    enum: ["buyer", "seller"],
    default: "buyer",
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return;
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
});

userSchema.method.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const userModel = mongoose.model("user", userSchema);

export default userModel;
