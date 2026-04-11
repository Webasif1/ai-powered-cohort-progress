import mongoose from "mongoose"
import bcrypt from "bcrypt"



const userSchema = mongoose.Schema({
  email:{
    type:String,
    require: [true, "Email is require"],
    unique: [true, "Email should be unique"]
  },
  contact:{
    type:Number,
    require:[true, "Contact number is require"],
    unique:[true, "Contact number should be unique"]
  },
  password:{
    type: String,
    require: [true, "Password is require"]
  },
  fullName:{
    type:String,
    require:[true,"fullName is require"],
  }
})

userSchema.pre("save", async function(next){
  if(!this.isModified("password")) return
  this.password = await bcrypt.hash(this.password,10)
  next()
})

userSchema.method.comparePassword = function(candidatePassword){
  return bcrypt.compare(candidatePassword, this.password)
}

const user = mongoose.model("user", userSchema)

export default user
