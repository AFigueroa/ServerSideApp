var mongoose = require('mongoose'),
    GroceryItemSchema = require('./models/groceryitem.model.js'),
    url = 'mongodb://localhost:27017/syneschool';

// Initialize Mongoose library and connect it with our MongoDB
mongoose.connect(url, function () {
    'use strict';
    console.log('Mongoose is connected.');
});
