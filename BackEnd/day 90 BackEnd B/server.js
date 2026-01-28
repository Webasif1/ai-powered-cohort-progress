const app = require("./src/app")
const port = 3000;
const mongoose = require("mongoose")

function mongo_db(){
  mongoose.connect("mongodb+srv://db_cohort:anPVa1IZgKmAICSU@cluster0.gavts6j.mongodb.net/day-90")
  .then(()=>{
    console.log("Mongo db connected");
  })
}

mongo_db()

app.listen(port,()=>{
  console.log(`The server is running on port ${port}`);
})
