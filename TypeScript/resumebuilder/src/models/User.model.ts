import { IUser } from "@/types/user.types";
import bcrypt from "bcrypt";
import mongoose, { Document } from "mongoose";

interface UserDocument extends Omit<IUser, "_id">, Document{
  comparePass(candidatePass:string) : boolean
}

const userSchema = new mongoose.Schema<UserDocument>(
  {
    name: {
      type: String,
      trim: true,
      require: [true, "Name is required"],
    },
    email: {
      type: String,
      trim: true,
      unique: [true, "Email should be unique"],
      require: [true, "Email is required"],
    },
    mobile: {
      type: String,
      minlength: [11, "min 11 characters is require"],
      maxlength: [13, "max 13 characters is require"],
    },
    password: {
      type: String,
      require: [true, "Password is required"],
      minlength: [6, "Min 6 characters require"],
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", function (): void {
  if (!this.isModified("password")) return;
  this.password = bcrypt.hashSync(this.password, 10);
});

userSchema.methods.comparePass = function (candidatePass: string): boolean {
  return bcrypt.compareSync(candidatePass, this.password);
};

const userModel = mongoose.models.User || mongoose.model("User", userSchema);

export default userModel;
