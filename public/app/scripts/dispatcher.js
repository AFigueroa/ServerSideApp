var uuid = require('node-uuid');
var listeners = {};

/*  Our dispatcher will serve as a middle-man between our client-side actions and
    our server-side API calls. It is able to dispatch multiple payloads to the store */
module.exports = {
    
    // Called upon by the STORE to catch payloads and payload types incoming from the ACTIONS
    register: function (done) {
        'use strict';
        var id = uuid.v1();
        
        listeners[id] = done;
        
        return id;
    },
    
    // Used by the ACTIONS to distribute payloads and payload types to the STORE
    dispatch: function (payload) {
        'use strict';
        var id,
            listener;
        
        // @forDevOnly
        console.log('Dispatching...', payload);
        
        for (id in listeners) {
            
            // If the property exists...
            if (listeners.hasOwnProperty(id)) {
                listener = listeners[id];
                listener(payload);
            }
        }
    }
    
};
