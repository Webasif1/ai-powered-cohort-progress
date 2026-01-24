const express = require('express');


const app = express()

app.get("/",(req,res)=>{
  res.send("hello")
})

app.listen(3000,(req,res)=>{
  console.log(`The server is running on port 3000`);
})
