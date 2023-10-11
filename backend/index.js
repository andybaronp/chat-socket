const express = require("express");
const cors = require("cors");
const http = require("http");
// server express
const app = express();
app.use(cors());


const server = http.createServer(app);
const { Server } = require("socket.io")



const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],

  }
})


io.on("connection", (socket) => {

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.roomName).emit("receive_message", data);
  });




})




server.listen(process.env.PORT || 3003, () => {
  console.log('Server run on port 3003');
});


