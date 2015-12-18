'use strict';

var port = '8080',
    socket = io('ws://localhost:' + port);

socket.on('connect', function () {

    console.log('Socket.io: Connected');

});