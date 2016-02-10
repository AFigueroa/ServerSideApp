var port = '8080',
    socket = io('ws://localhost:' + port);

// Establish a Socket connection for this client
socket.on('connect', function () {
    'use strict';
});
