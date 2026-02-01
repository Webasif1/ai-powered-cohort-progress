/*Require Express from express */
const express = require("express")
/**Import noteModel from ./models/note.model */
const noteMOdel = require("./models/note.model")
/*Create app variable */
const app = express()


/**Middlewares */
/**Request element from body */
app.use(express.json())

/**Create post API */
app.post("/api/notes", async (req,res)=>{
  /**Bring data from body */
  const {title,description} = req.body

  /**Create noteModel */
  const note = await noteMOdel.create({
    title,
    description
  })

  /**Response Status */
  res.status(201).json({
    message:"Note has been created",
    note
  })
})

/**Create get API */
app.get("/api/notes", async (req,res)=>{
  /**Fetch data from noteModel server*/
  const note = await noteMOdel.find();

  /**Send response */
  res.status(200).json({
    message:"Note fetched successfully",
    note
  })

})

/**Create delete API */
app.delete("/api/notes/:id", (req,res)=>{

})

/** Export app in server.js file to run server */
module.exports = app
