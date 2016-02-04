var uuid = require('node-uuid');
var listeners = {};

module.exports = {
    register: function(done){
        var id = uuid.v1();
        
        listeners[id] = callback;
        
        return id;
    },
    dispatch: function(payload){
        
        var id;
        console.log('Dispatching...', payload);
        
        for(id in listeners){
            var listener = listeners[id];
            listener(payload);
        }
    }
    
};
