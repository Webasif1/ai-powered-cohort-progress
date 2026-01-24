const express = require('express')


const app = express();
const notes = []

app.use(express.json())


app.get("/",(req,res)=>{
  res.send('This is note application')
})

app.post("/notes",(req,res)=>{
  console.log(req.body);
  notes.push(req.body)
  res.send('Note Created')
})

app.get("/notes",(req,res)=>{
  res.send(notes)
})

app.delete("/notes/:index",(req,res)=>{
  delete notes[req.params.index]
  res.send("Delete successfully")
})

app.patch("/notes/:index",(req,res)=>{
  notes[req.params.index].description = req.body.description
  res.send("Not updated successfully")
})



module.exports= app;
