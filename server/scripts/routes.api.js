///// Routing \\\\\

var express = require('express'),
    GroceryItemSchema = require('./../models/groceryitem.model.js');

module.exports = (function(){

    'use strict';
    
    var api = express.Router();
    
    // Grocery Items Route
    api.get('/items', function(req, res) {

        GroceryItemSchema.find(function(err, data){

            if(err){
                res.status(500).send(err);
            }else{
                res.status(200).send(data);
            };

        });

    })
    .post('/items', function(req, res){

        var item = req.body,
            groceryItem = new GroceryItemSchema(item);

        groceryItem.save(function(err, data){

            if(err){
                res.status(500).send(err);
            }else{
                res.status(200).send();
            };


        });

    })
    .delete('/items/:id', function(req, res) {

        var itemId = req.params.id;

        GroceryItemSchema.findOne({
            _id : itemId
        }).remove(function(err, data){

            if(err){
                res.status(500).send(err);
            }else{
                res.status(200).send();
            };

        });

    })
    .put('/items/:id', function(req, res){

        GroceryItemSchema.findOne({
            _id: req.body._id
        }, function(err, data){

            if(data){
                var property,
                item = req.body;

                for(property in item){
                    data[property] = item[property];
                };

                data.save();
                res.status(200).send();
            }

        })

    });
    
    return api;
    
})();
