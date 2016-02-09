var dispatcher = require('./../../scripts/dispatcher.js');
var helper = require('./../helpers/rest.helper.jsx');
var uuid = require('node-uuid');

/*  This store will handle the creation of new grocery items, their deletion
    and their updating of purchased property. */
function GroceryItemStore(){

    var listeners = [],
        items = [];
    
    // Get all items from the
    helper.get("/api/items")
    .then(function(response){
        console.log(response)
        items = response;
        triggerListeners();
    })

    // Analyse the incoming dispatcher request
    dispatcher.register(function(event){
        
        // split the string by key ":"
        var split = event.type.split(':');
        
        // Now, check which action the payload belongs too
        if(split[0] === 'grocery-item'){
            switch(split[1]){
            
            // Add Grocery Item
            case "add":
                addGroceryItem(event.payload);
                break;
            
            // Delete Grocery Item
            case "delete":
                deleteGroceryItem(event.payload);
                break;
            
            // Buy Grocery Item
            case "buy":
                setGroceryItemBought(event.payload, true);
                break;
            
            case "unbuy":
                setGroceryItemBought(event.payload, false);
                break;
            }
        }
    });

    // Serve the current state of the grocery items 
    return{
        // These methods are publicly accessible because of being within the return 
        getItems: get,
        onChange: onChange
    }
    
    
    // GET all grocery items
    function get(){
        return items;
    }

    // ADD a grocery item 
    function addGroceryItem(item){
        
        item.id = uuid.v1();

        // Store the item within our array
        items.push(item);
        
        // Trigger the listeners so that the DOM gets re-rendered
        triggerListeners();

        helper.post("api/items", item)
        .then(function(){
        // Error Handler
        });
    }
    
    // DELETE a grocery item
    function deleteGroceryItem(item){
        var index;
        
        // Find the index of the item to be deleted
        items.filter(function(_item, _index){
        
        //If names match, the index is this item's index
            if(_item.name == item.name){
                index= _index
            }
        })
        
        // With the index, now remove the item from our array
        items.splice(index, 1);
        
        // Trigger listeners to refresh the DOM
        triggerListeners();
        
        helper.del('api/items/'+ item.id);

    }

    // SET a grocery item as purchased by changing toggeling "true" and "false"
    function setGroceryItemBought(item, isBought){
        
        // Get the first item where the names match
        var _item = items.filter(function(a){
            return a.name == item.name;
        })[0];
        
        // Set the item's purchased to whatever value being passed (catch nulls as false)
        item.purchased = isBought || false;
        
        // Trigger the listeners so that the DOM gets re-rendered
        triggerListeners();

        helper.put('api/items/'+item.id, item);
    }
    
    /*  When any change occurs 
        (bound to the public method: "GroceryItemStore.onChange()") */
    function onChange(listener){
        // Refresh the DOM
        listeners.push(listener);
    }

    //@triggerListeners : Refreshes the data to cause the DOM to re-render
    function triggerListeners(){
        listeners.forEach(function(listener){
            listener(items);
        });
    }
}

// Export the GroceryItemStore to have it's returned methods publicly available
module.exports = new GroceryItemStore();
