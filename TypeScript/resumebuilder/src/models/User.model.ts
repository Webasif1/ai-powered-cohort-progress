import { IUser } from "@/types/user.types";
import bcrypt from "bcrypt"
import mongoose from "mongoose";


const userSchema = new mongoose.Schema<IUser>({
  name:{
    type:String,
    trim:true,
    require:[true, "Name is required"]
  },
  email:{
    type:String,
    trim:true,
    unique:[true, "Email should be unique"],
    require:[true, "Email is required"]
  },
  mobile:{
    type:String,
    require:[true, "Mobile number is require"],
    minlength:[11,"min 11 characters is require"],
    maxlength:[11,"max 11 characters is require"]
  },
  password:{
    type:String,
    require:[true, "Password is required"],
    minlength:[6, "Min 6 characters require"]
  }
},{
  timestamps:true
})

userSchema.pre("save", function(){
  if(!this.isModified("password")) return;
  this.password = bcrypt.hashSync(this.password,10)
})

userSchema.methods.comparePass = function (candidatePass: string){
  return bcrypt.compareSync(candidatePass, this.password)
}

const userModel = mongoose.model("User", userSchema)

export default userModel
