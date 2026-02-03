/**Require mongoose to create Schema */
const mongoose = require('mongoose');

/**Create Schema for Notes */
const NotesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
  })

/**Export Notes model */
module.exports = mongoose.model('notesModel', NotesSchema);
