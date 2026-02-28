const express = require("express")
const cookie = require("cookie-parser")

const app = express()

app.use(express.json())
app.use(cookie())

const authRouter = require("./routes/auth.routes")

app.use("/api/auth", authRouter)

module.exports = app
