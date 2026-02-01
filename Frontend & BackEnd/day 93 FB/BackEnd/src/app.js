/*Require Express from express */
const express = require("express");
/**Import noteModel from ./models/note.model */
const noteMOdel = require("./models/note.model");
const noteModel = require("./models/note.model");
/*Create app variable */
const app = express();

/**Middlewares */
/**Request element from body */
app.use(express.json());

/**Create post API  for create note*/
app.post("/api/notes", async (req, res) => {
  /**Bring data from body */
  const { title, description } = req.body;

  /**Create noteModel */
  const note = await noteMOdel.create({
    title,
    description,
  });

  /**Response Status */
  res.status(201).json({
    message: "Note has been created",
    note,
  });
});

/**Create get API for get data*/
app.get("/api/notes", async (req, res) => {
  /**Fetch data from noteModel server*/
  const note = await noteMOdel.find();

  /**Send response */
  res.status(200).json({
    message: "Note fetched successfully",
    note,
  });
});

/**Create delete API  for delete note*/
app.delete("/api/notes/:id", async (req, res) => {
  /**Get id form params */
  const id = req.params.id;

  /**Delete note by id */
  await noteModel.findByIdAndDelete(id);

  /**Send response */
  res.status(200).json({
    message: "Note deleted successfully",
  });
});

/**Create patch API  for update note*/
app.patch("/api/notes/:id", async (req, res) => {
  /**Get id form params */
  const id = req.params.id;

  /**Description request from body */
  const { description } = req.body;

  /**Update note by id */
  await noteModel.findByIdAndUpdate(id, { description });

  /**Send response */
  res.status(200).json({
    message: "Note updated successfully",
  });
});

/** Export app in server.js file to run server */
module.exports = app;
