var dispatcher = require('./../../../../scripts/dispatcher.js');

/*  Captures the client's requests and directs them to the dispatcher
    with the correct payload type */
module.exports = {

    // On ADD grocery item event 
    add: function(item){
        dispatcher.dispatch({
            payload:item,
            type:"grocery-item:add"
        });
    },
    
    // On DELETE grocery item event 
    delete: function(item){
        dispatcher.dispatch({
            payload:item,
            type:"grocery-item:delete"
        });
    },
    
    // On BUY event of a grocery item 
    buy: function(item){
        dispatcher.dispatch({
            payload:item,
            type:"grocery-item:buy"
        });
    },
    
    // On BUY event of a grocery item 
    unbuy: function(item){
        dispatcher.dispatch({
            payload:item,
            type:"grocery-item:unbuy"
        });
    }
    
};
