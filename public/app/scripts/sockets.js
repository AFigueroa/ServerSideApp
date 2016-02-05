var port = '8080',
    socket = io('ws://localhost:' + port);

socket.on('connect', function () {
    'use strict';
    console.log('Socket.io: Connected');

});