var module;

module.exports = function () {
  
    'use strict';
    
    var client = "./public/",
        config = {
        
            /* 
                File Paths
            */
            
            // Temporary Directory
            cssDir: client + "css",

            // All JS to vet
            alljs: [
                './server.js',
                './sever/*.js',
                './public/*.js',
                '!./public/vendor/*.js'
            ],

            // Less files
            stylus: client + 'stylus/custom.styl'

        };
    
    return config;
    
};