///// Routing \\\\\
var express = require('express');

module.exports = (function(){

    var router = express.Router();
    
    // Login route
    router.get('/login', function(req, res) {

        'use strict';

        res.render('login');
        
    });
    

    // "Otherwise" route
    router.get('*', function(req, res) {

        'use strict';

        res.render('index');
        
    });
    
    return router;
    
})();
