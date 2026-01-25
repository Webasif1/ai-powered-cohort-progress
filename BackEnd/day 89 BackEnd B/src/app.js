const express = require('express');
const app = express();

app.use(express.json())

const notes = []

app.get("/",(req,res)=>{
  res.send("Home Page")
})

app.post("/notes",(req,res)=>{
  notes.push(req.body)
  res.status(201).json({
    message:"Note created successfully"
  })
})

app.get("/notes",(req,res)=>{
  res.status(200).json({
    notes: notes
  })
})

app.delete("/notes/:index",(req,res)=>{
  delete notes[req.params.index]
  res.status(204).json({
    message:"The post deleted success fully"
  })
})

app.patch("/notes/:index",(req,res)=>{
  notes[req.params.index].description = req.body.description;

  res.status(200).json({
    message:"Note Updated"
  })
})
module.exports = app;
