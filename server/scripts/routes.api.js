///// Routing \\\\\

var express = require('express'),
    GroceryItemSchema = require('./../models/groceryitem.model.js');

module.exports = (function () {
    'use strict';
    
    // Load the an instance of the Express Router for out API
    var api = express.Router();
    
    // GET all Grocery Items
    api.get('/items', function (req, res) {

        // Find all
        GroceryItemSchema.find(function (err, data) {

            // Check for errors
            if (err) {

                // Error occurred: Return error data
                res.status(500).send(err);

            } else {

                // Return the data
                res.status(200).send(data);

            }

        });

    })

    // CREATE Grocery Item
    .post('/items', function (req, res) {

        // Dependencies
        var item = req.body,
            groceryItem = new GroceryItemSchema(item);

        // Call on mongoose save, from our shcema file
        groceryItem.save(function (err, data) {

            // Check for errors
            if (err) {

                // Error occurred: Return error data
                res.status(500).send(err);

            } else {

                // Return status to alert that the request was succesful
                res.status(200).send();
            }

        });

    })

    // DELETE Grocery Item
    .delete('/items/:id', function (req, res) {

        // Catch the id
        var itemId = req.params.id;

        // Find the item to be deleted by it's id
        GroceryItemSchema.findOne({
            id : itemId
        })

        // Remove the item that is returned by the find
        .remove(function (err, data) {

            // Check for errors
            if (err) {

                // Error occurred: Return error data
                res.status(500).send(err);

            } else {

                // Return status to alert that the request was succesful
                res.status(200).send();

            }

        });

    })

    // UPDATE Grocery Item
    .put('/items/:id', function (req, res) {

        // Catch the id
        var itemId = req.body.id;

        // Find the item to be updated by it's id
        GroceryItemSchema.findOne({
            id: itemId
        }, function (err, data) {

            // Check for errors
            if (err) {

                // Error occurred: Return error data
                res.status(500).send(err);

            }else{

                // Catch the item
                var property,
                    item = req.body;

                // Check that item isn't null
                if (item) {

                    // For each property of the item assign the updated value
                    for (property in item) {

                        // Check that the property exists
                        if (item.hasOwnProperty(property)) {

                            // Assign the new value
                            data[property] = item[property];
                        }

                    }
                }

                // Save the updated item
                data.save();

                // Return status to alert that the request was succesful
                res.status(200).send();

            };

        });

    });

    // Expose the methods to Express
    return api;
    
}());
