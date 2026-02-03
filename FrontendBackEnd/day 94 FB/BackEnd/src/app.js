/**Express require from express (node_model) */
const express = require("express")
/**Cors require from cors (node_model) */
const cors = require("cors")
/**Path require for path */
const path = require("path")
/**Require Notes model */
const notesModel = require('./models/notes.models')

/**Cerate app variable */
const app = express();
/**Middleware to parse json data */
app.use(express.json());
/**Use cors middleware */
app.use(cors());
/**Path middleware */
app.use(express.static(path.join(__dirname, '../public')));

/**Create post api for create note api */
app.post('/api/notes', async (req, res) => {
  //Destructure title and description from req.body
  const{title, description} = req.body;
  //Create note in database
  const note = await notesModel.create({title, description});
  //Send response
  res.status(201).json({
    message: "Note created successfully",
    note
  });
})

/*Create get api for get all notes api */
app.get('/api/notes', async (req, res) => {
  //Get all notes from database
  const notes = await notesModel.find();
  //Send response
  res.status(200).json({
    message: "Notes fetched successfully",
    notes
  });
})

/*Create delete api for delete note api */
app.delete('/api/notes/:id', async (req, res) => {
  //Get id from req.params
  const {id} = req.params;
  //Delete note from database
  await notesModel.findByIdAndDelete(id);
  //Send response
  res.status(200).json({
    message: "Note deleted successfully"
  });
})

/*Create patch api for update note api */
app.patch('/api/notes/:id', async (req, res) => {
  //Get id from req.params
  const {id} = req.params;
  //Get title and description from req.body
  const {title, description} = req.body;
  //Update note in database
  const updatedNote = await notesModel.findByIdAndUpdate(id, {title, description}, {new: true});
  //Send response
  res.status(200).json({
    message: "Note updated successfully",
    updatedNote
  });
})

app.get('*name', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
})

/**Module exports app to server.js for running server */
module.exports = app
