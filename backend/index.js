const app = require("express")();
const http = require("http")
const express = require("express");
const dbConfig = require("./db/connect");
const {Server} = require("socket.io")
const userRoutes = require("./routes/users");
const {socketConnected} = require("./socketController")

const cors = require("cors");
app.use(cors());
require("dotenv").config();
// database configuration
dbConfig.connectDb();





//cors config
// limiting all the acces that comes from other hosting

// allowing the json and url encoded in the requesst body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/test", (req, res) => {
  res.send("LOL testing wooh");
});

// bringing all the routes
userRoutes.userRoutes(app);


const server = http.createServer(app)
const io = new Server(server, {
  cors:{
    origin:"http://157.245.120.161:5173",
    methods: ["GET", "POST"]
  }
})

io.on("connect", (socket) => {
  console.log('connected')
  // console.log(socket);
  
  socket.on("disconnect", ()=> {
    console.log("client disconnected..");
  })
})
server.listen(process.env.PORT, () => {
  console.log(`App running and connected to port ${process.env.PORT}`);
});


const Socket = function () {
  return {
    emit: function (event, data) {
      io.sockets.emit(event, data);
    },
    to: function (roomId, event, data) {
      io.sockets.to(roomId).emit(event, data);
    },
  };
};

module.exports.Socket =io