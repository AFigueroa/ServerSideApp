'use strict';

///// Load Dependencies \\\\\
var express = require('express'),
    http = require('http').Server(express),
    io = require('socket.io')(http),
    stylus = require('stylus'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    mongodb = require('mongodb'),
    MongoClient = mongodb.MongoClient; 

///// App Configuration \\\\\

// URL to our mongodb
var url = 'mongodb://localhost:27017/syneschool';

// Use connect method to connect to the Server
MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    //HURRAY!! We are connected. :)
    console.log('Connection established to', url);

    // do some work here with the database.

    //Close connection
    db.close();
  }
});

// Set the NODE environment value or a default
var env = process.env.NODE_ENV = process.env.NODE_ENV || "development";

// Initiate the Express app
var app = express();

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
app.use(stylus.middleware(
    {
        src: __dirname + '/public',
        compile: compile
    }
));

// Setup public routing to the "public" directory
app.use(express.static(__dirname + '/public'));


///// Routing \\\\\

// "Otherwise" route
app.get('*', function (req, res) {
    
    'use strict';
    
    res.render('index');
    
});

//Socket IO Event Listeners

//@ Connection
io.on('connection', function(socket){
  console.log('a user connected');
});


///// Server Configuration \\\\\

var port = 8080;
app.listen(port);

console.log('Listening on port ' + port + '...');