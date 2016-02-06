///// Routing \\\\\

var express = require('express');

module.exports = (function(){

    'use strict';
    
    var api = express.Router();
    
    var items = [
        {
            name: 'Ice Cream'
        },
        {
            name: 'Waffles'
        },
        {
            name: 'Candy',
            purchased : true
        },
        {
            name: 'Snarks'
        }
    ];

    // Test Route
    api.get('/items', function(req, res) {
        console.log('Test API Route has been called');
        res.send(items);
    });
    
    return api;
    
})();