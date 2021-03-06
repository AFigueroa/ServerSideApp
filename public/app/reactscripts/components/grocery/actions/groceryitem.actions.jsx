var dispatcher = require('./../../../../scripts/dispatcher.js');

/*  Captures the client's requests and directs them to the dispatcher
    with the correct payload type */
module.exports = {

    // On ADD grocery item event 
    add: function (item) {
        'use strict';

        dispatcher.dispatch({
            payload: item,
            type: "grocery-item:add"
        });
    },
    
    // On DELETE grocery item event 
    del: function (item) {
        'use strict';

        dispatcher.dispatch({
            payload: item,
            type: "grocery-item:delete"
        });
    },
    
    // On BUY event of a grocery item 
    buy: function (item) {
        'use strict';

        dispatcher.dispatch({
            payload: item,
            type: "grocery-item:buy"
        });
    },
    
    // On UNBUY event of a grocery item
    unbuy: function (item) {
        'use strict';

        dispatcher.dispatch({
            payload: item,
            type: "grocery-item:unbuy"
        });
    }
    
};
