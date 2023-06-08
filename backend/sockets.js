let io;
const { Server } = require("socket.io");
module.exports = {
  init: (server) => {
    io = new Server(server, {
      cors: {
        origin: "http://157.245.120.161:5173",
        methods: ["GET", "POST"],
      },
    });
    return io;
  },
  get: () => {
    if (!io) {
      throw new Error("socket is not initialized");
    }
    return io;
  },
};
