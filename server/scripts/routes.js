///// Routing \\\\\
var express = require('express');

module.exports = (function () {
    'use strict';

    // Initiate a new instance of Express Router for our view routing
    var router = express.Router();
    
    // Login route
    router.get('/login', function (req, res) {

        // Render LOGIN template
        res.render('login');
        
    });
    

    // "Otherwise" route
    router.get('*', function (req, res) {

        // Render HOME template
        res.render('index');
        
    });
    
    // Expose the routes to Express
    return router;
    
}());
