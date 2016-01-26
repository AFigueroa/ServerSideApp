///// Load Dependencies \\\\\
var express = require('express'),
    app = express(),
    http = require('http').Server(app),
    io = require('./server/scripts/socket.io.routes.js').listen(http),
    stylus = require('stylus'),
    logger = require('morgan'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

///// App Configuration \\\\\

// URL to our mongodb
var url = 'mongodb://localhost:27017/syneschool';
mongoose.connect(url);

// Test the conection
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    'use strict';
    console.log('Mongoose has connected to the MongoDB database.');
});

// Set the NODE environment value or a default
var env = process.env.NODE_ENV = process.env.NODE_ENV || "development";

// Configure Stylus for CSS rendering
function compile(str, path) {
    'use strict';
    return stylus(str).set('filename', path);
}

// Configure the Express app
app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(stylus.middleware({
    src: __dirname + '/public',
    compile: compile
}));

// Setup public routing to the "public" directory
app.use(express.static(__dirname + '/public'));


///// Routing \\\\\

// Main Template Serving Routes
var router = require('./server/scripts/routes.js');

// API Routes
var api = require('./server/scripts/routes.api.js');

app.use('/', router);
app.use('/api', api);


///// Server Configuration \\\\\

var port = 8080;
http.listen(port, function () {
    'use strict';
    console.log('Running on localhost:' + port);
});
