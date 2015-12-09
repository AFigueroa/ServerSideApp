var module;

module.exports = function () {
  
    'use strict';
    
    var client = "./public/",
        clientApp = client + "app/",
        server = "./server/",
        config = {
        
            /* 
                File Paths
            */
            // Temporary Directory
            cssDir: clientApp + "styles/",
            
            // Path to the Layout templates
            layoutTmps: server + 'includes',
            // All JADE templates
            jade: [
                server + 'includes/layout.jade',
                server + 'includes/scripts.jade'
            ],
            allJade: server + '**/*.jade',
            
            // All JS for injection
            js:[
                clientApp + '**/*.module.js',
                clientApp + '**/*.service.js',
                clientApp + '**/*.controller.js',
                clientApp + '**/*.js'
            ],
            
            // All CSS for injection
            css: clientApp + 'styles/*.css',
            
            // All JS to vet
            alljs: [
                './server.js',
                './sever/*.js',
                clientApp + '*.js',
                clientApp + 'vendor/*.js'
            ],

            // Less files
            stylus: client + 'stylus/custom.styl',
            
            server: server,
            
            /* 
                BrowserSync
            */
            browserReloadDelay: 1000,

            /* 
                BOWER and NPM locations
            */
            bower:{
                json: require('./bower.json'),
                directory: './public/vendor/',
                ignorePath: '../../public/'
            },
            
            // NODE SETTINGS
            defaultPort : 8080,
            nodeServer : './server.js'
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