var dispatcher = require('./../../scripts/dispatcher.js');

function GroceryItemStore(){

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

    var listeners = [];

    function get(){
        return items;
    }

    function addGroceryItem(item){
        items.push(item);
        triggerListeners();
    }

    function onChange(listener){
        listeners.push(listener);
    }

    function triggerListeners(){
        listeners.forEach(function(listener){
            listener(items);
        });
    }

    dispatcher.register(function(event){
        var split = event.type.split(':');
        if(split[0] === 'grocery-item'){
            switch(split[1]){
            case "add":
                addGroceryItem(event.payload);
                break;
            }
        }
    });

    return{
        getItems: get,
        onChange:onChange
    }
}

module.exports = new GroceryItemStore();
