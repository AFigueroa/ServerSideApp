///// Routing \\\\\

var express = require('express');

module.exports = (function(){

    var router = express.Router();
    
    // "Otherwise" route
    router.get('*', function(req, res) {

        'use strict';

        res.render('index');
        
    });
    
    return router;
    
})();