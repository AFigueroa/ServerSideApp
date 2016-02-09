var mongoose = require('mongoose'),
    GroceryItemSchema = require('./models/groceryitem.model.js'),
    url = 'mongodb://localhost:27017/syneschool';

mongoose.connect(url, function(){
    console.log('Mongoose is connected.');
});
