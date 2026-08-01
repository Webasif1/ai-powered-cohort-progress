import { IUser } from "@/types/user.types";
import bcrypt from "bcrypt";
import mongoose, { Document } from "mongoose";

interface UserDocument extends Omit<IUser, "_id">, Document{
  comparePass(candidatePass:string) : boolean
}

const userSchema = new mongoose.Schema<UserDocument>(
  {
    // `require` is not a Mongoose option — the correct key is `required`.
    // With the typo none of these were ever enforced, which is how a user
    // document can exist with no password at all.
    name: {
      type: String,
      trim: true,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: [true, "Email is required"],
    },
    mobile: {
      type: String,
      minlength: [11, "min 11 characters is require"],
      maxlength: [13, "max 13 characters is require"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
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
  // `bcrypt.compareSync` throws — it does not return false — when either
  // argument is missing ("data and hash arguments required"). Any account
  // stored without a password therefore turned a wrong-credentials check
  // into an uncaught exception, and the login route answered 500 instead
  // of 401. A missing hash means "cannot authenticate", so answer false.
  if (!candidatePass || typeof this.password !== "string" || !this.password) {
    return false;
  }

  try {
    return bcrypt.compareSync(candidatePass, this.password);
  } catch {
    // Stored value is not a valid bcrypt hash (e.g. a plaintext password
    // written before hashing was added). Treat it as a failed login rather
    // than a server error.
    return false;
  }
};

const userModel = mongoose.models.User || mongoose.model("User", userSchema);

export default userModel;
