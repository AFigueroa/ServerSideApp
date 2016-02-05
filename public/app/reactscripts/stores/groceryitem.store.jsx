var dispatcher = require('./../../scripts/dispatcher.js');

/*  This store will handle the creation of new grocery items, their deletion
    and their updating of purchased property. */
function GroceryItemStore(){

    var listeners = [];
    
    // TEMPORARY: this will be replaced with a MongoDB collection
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
            }
        }
    });

    // Serve the current state of the grocery items 
    return{
        // These methods are publicly accessible because of being within the return 
        getItems: get,
        onChange:onChange
    }
    
    
    // Get all grocery items
    function get(){
        return items;
    }

    // Add a grocery item 
    function addGroceryItem(item){
        
        // Sotre the item within our array
        items.push(item);
        
        // Trigger the listeners so that the DOM gets re-rendered
        triggerListeners();
    }
    
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
