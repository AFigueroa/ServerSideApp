var mongoose = require('mongoose');

/*  Defines the schema for Grocery Items that
    all CRUD calls will be able to use */

// Grocery Item Schema
var GroceryItemSchema = {
    name: String,
    purchased: Boolean,
    id: String
};

// Inject and enable the schema
var GroceryItem = mongoose.model('GroceryItem', GroceryItemSchema, 'groceryItems');

// Export the schema to all files which include this schema
module.exports = GroceryItem;
