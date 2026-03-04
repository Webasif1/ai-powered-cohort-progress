const express = require("express")
const upload = require("../middleware/upload.middleware")
const {uploadSong} = require("../controller/song.controller")

const router = express.Router()

router.post("/", upload.single("song"), uploadSong)

module.exports = router
