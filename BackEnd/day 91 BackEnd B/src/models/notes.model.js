const mongoose = require("mongoose")


const noteSchema  = new mongoose.Schema({
  title:String,
  description:String,
})

const noteMOdel = mongoose.model("notes", noteSchema)

module.exports = noteMOdel
