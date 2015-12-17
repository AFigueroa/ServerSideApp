///// Routing \\\\\

var express = require('express');

module.exports = (function(){

    'use strict';
    
    var api = express.Router();
    
    // Test Route
    api.get('/test', function(req, res) {
        console.log('Test API Route has been called');
    });
    
    return api;
    
})();