const mongoose = require("mongoose")

async function connectToDb(){
  try{
    await mongoose.connect(process.env.MONGO_URI)
    console.log("Connected to db");
  }
  catch(err){
    console.log("Error Connecting To DB", err);
  }
}

module.exports = connectToDb
