// Sockets.io Routes
var socketio = require('socket.io');

module.exports.listen = function (app) {
    io = socketio.listen(app);

    io.on('connection', function (socket) {

        // New Grocery Item
        socket.on('new-grocery-item', function(item){
            socket.broadcast.emit('new-grocery-item', item);
        });

    });

    return io;
};
