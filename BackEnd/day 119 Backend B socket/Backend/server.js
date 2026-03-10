import app from "./src/app.js";
import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer(app);
const io = new Server(httpServer, {
  /**Options */
});

io.on("connection",(socket)=>{
  console.log("New connection created")

  socket.on("message", (msg)=> {
    console.log("User fired message event")
    console.log(msg)

    io.emit("abc", msg)
  })
})

// app.listen(3000, ()=>{
//   console.log("The server is running on port: 3000")
// })

httpServer.listen(3000, () => {
  console.log("The server is running on port: 3000");
});
