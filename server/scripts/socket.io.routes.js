// sockets.js
var socketio = require('socket.io')

module.exports.listen = function(app){
    io = socketio.listen(app)

    io.on('connection', function(socket){
        console.log('A user has connected to Sockets.io');
    })

    return io
}