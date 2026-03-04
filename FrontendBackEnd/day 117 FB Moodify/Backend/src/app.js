const express = require("express")
const cookie = require("cookie-parser")
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(cookie())
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}))

const authRouter = require("./routes/auth.routes")
const songsRouter = require("./routes/song.routes")

app.use("/api/auth", authRouter)
app.use("/api/songs", songsRouter )

module.exports = app
