var module;

module.exports = function () {
  
    'use strict';
    
    var client = "./public/",
        server = "./server/",
        config = {
        
            /* 
                File Paths
            */
            
            // Temporary Directory
            cssDir: client + "css",
            
            // Path to the Layout templates
            layoutTmps: server + 'includes',
            // All JADE templates
            jade: [
                server + 'includes/layout.jade',
                server + 'includes/scripts.jade'
            ],
            
            // All JS for injection
            js:[
                client + 'vendor/*.js',
                client + '**/*.module.js',
                client + '**/*.js'
            ],
            
            // All CSS for injection
            css: client + 'css/*.css',
            
            // All JS to vet
            alljs: [
                './server.js',
                './sever/*.js',
                client + '*.js',
                client + 'vendor/*.js'
            ],

            // Less files
            stylus: client + 'stylus/custom.styl',

            /* 
                BOWER and NPM locations
                
            */
            bower:{
                json: require('./bower.json'),
                directory: './public/vendor/',
                ignorePath: '../..'
            }
        };
    
    config.getWiredepDefaultOptions = function() {
        
        var options = {
            bowerJson: config.bower.json,
            directory: config.bower.directory,
            ignorePath: config.bower.ignorePath
        };
        
        return options;
    }
    
    return config;
    
};