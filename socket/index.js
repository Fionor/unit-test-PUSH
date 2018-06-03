
const socket_server = require('socket.io');
let io;

module.exports = (server) => {
    io = socket_server(server);
    io.on('connection', socket => {
        console.log(`SOCKET CONNECTION ${socket.handshake.query.room}`)
        socket.join(socket.handshake.query.room);
        socket.on('disconnect', () => {
            console.log(`SOCKET DISCONNECT ${socket.handshake.query.room}`)
        });
    });
    return io;
}