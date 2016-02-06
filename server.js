///// Load Dependencies \\\\\

var express = require('express'),
    app = express(),
    http = require('http').Server(app),
    io = require('./server/scripts/socket.io.routes.js').listen(http),
    stylus = require('stylus'),
    logger = require('morgan'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    crypto = require("crypto"),
        algorithm = 'aes-256-ctr',
        password = 'n123oDHri1VCodqdaD';


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
app.set('views', __dirname + '/server/views')
    .set('view engine', 'jade')
    .use(logger('dev'))
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({
        extended: false
    }))
    .use(stylus.middleware({
        src: __dirname + '/public',
        compile: compile
    }))
    .use(express.static(__dirname + '/public'));

// Define Passport Local Strategy
passport.use(new LocalStrategy(
  function(username, password, done) {
    db.users.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!user.verifyPassword(password)) { return done(null, false); }
      return done(null, user);
    });
  }
));


///// Routing \\\\\

// Main Template Serving Routes
var router = require('./server/scripts/routes.js');

// API Routes
var api = require('./server/scripts/routes.api.js');

app.use('/api', api);
app.use('/', router);


///// Server Configuration \\\\\

var port = 8080;
http.listen(port, function () {
    'use strict';
    console.log('Running on localhost:' + port);
});


///// SERVER METHODS \\\\\\

// Server's Encrypt Method
function encrypt(text){
// Uses Node JS's built-in encryption system, Crypto, to encrypt the data supplied
    
    // Cipher the data and use the secret key
    var cipher = crypto.createCipher(algorithm,password);
    
    // Configure the Cipher
    var crypted = cipher.update(text,'utf8','hex');
    
    // Finalize the encrypted string
    crypted += cipher.final('hex');
    
    // Return the encrypted data
    return crypted;
    
}
 
// Server's Decrypt Method
function decrypt(text){
// Uses Node JS's built-in encryption system, Crypto, to decrypt the data supplied
    
    // Decipher the data using the secret key
    var decipher = crypto.createDecipher(algorithm,password);
    
    // Configure the Cipher
    var dec = decipher.update(text,'hex','utf8');
    
    // Finalize the decryption
    dec += decipher.final('utf8');
    
    // Return the decrypted data
    // Return the decrypted data
    return dec;
}

