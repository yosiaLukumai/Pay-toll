module.exports.socketConnected = function(socket, io) {
    // new socket.io socket connected
    console.log(`controller: got socket.io connection ${socket.id}`);

    // register appropriate event handlers on the socket here
}