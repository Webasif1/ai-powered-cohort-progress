/**Require mongoose from mongoose */
const mongoose = require("mongoose");


/**Create Schema for note*/
const noteSchema = new mongoose.Schema({
  title:String,
  description:String,
})


/***Create note model  */
const noteModel = mongoose.model("notes", noteSchema)

/**Export model */
module.exports = noteModel
