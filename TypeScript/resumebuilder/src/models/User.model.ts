import { IUser } from "@/types/user.types";
import bcrypt from "bcrypt";
import mongoose, { Document } from "mongoose";

interface UserDocument extends Omit<IUser, "_id">, Document {
  comparePass(candidatePass: string): Promise<boolean>;
}

/**
 * bcrypt truncates at 72 bytes anyway, so anything longer is wasted work —
 * and without a ceiling a multi-megabyte password was an accepted request.
 */
export const MAX_PASSWORD_LENGTH = 72;

/** 10 was the old value; 12 is the current guidance and still ~250ms. */
const SALT_ROUNDS = 12;

const userSchema = new mongoose.Schema<UserDocument>(
  {
    // `require` is not a Mongoose option — the correct key is `required`.
    // With the typo none of these were ever enforced, which is how a user
    // document can exist with no password at all.
    name: {
      type: String,
      trim: true,
      required: [true, "Name is required"],
      maxlength: [120, "Name is too long"],
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: [true, "Email is required"],
      maxlength: [254, "Email is too long"],
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
      // The hash is never needed by any read path except the login compare,
      // so it stays out of every query result by default.
      select: false,
    },
  },
  {
    timestamps: true,
  },
);

// Async, not `hashSync`. The sync variants block the single Node thread for
// the full cost of the hash, so a flood of unauthenticated login requests
// made every other route — including page renders — unresponsive.
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
});

userSchema.methods.comparePass = async function (
  candidatePass: string,
): Promise<boolean> {
  // `bcrypt.compare` rejects — it does not resolve false — when either
  // argument is missing. Any account stored without a password therefore
  // turned a wrong-credentials check into an uncaught exception, and the
  // login route answered 500 instead of 401.
  if (!candidatePass || typeof this.password !== "string" || !this.password) {
    return false;
  }

  try {
    return await bcrypt.compare(candidatePass, this.password);
  } catch {
    // Stored value is not a valid bcrypt hash (e.g. a plaintext password
    // written before hashing was added). Treat it as a failed login rather
    // than a server error.
    return false;
  }
};

const userModel = mongoose.models.User || mongoose.model("User", userSchema);

export default userModel;
