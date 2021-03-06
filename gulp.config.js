var module;

module.exports = function () {
    'use strict';
    
    var client = "./public/",
        clientApp = client + "app/",
        reactScripts = clientApp + 'reactscripts/',
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
                '!' + clientApp + 'scripts/dispatcher.js',
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
                clientApp + 'vendor/*.js',
                clientApp + '/**/*.js',
            ],

            // All JSX files
            allJsx: reactScripts + '**/*.jsx',

            build: './build/',
            fonts: [
                clientApp + 'fonts/',
                client + 'vendor/font-awesome/fonts/**/*.*'
            ],
            images: [
                client + 'images/**/*.*'
            ],
            // Less files
            stylus: [
                client + 'stylus/layout.styl',
                client + 'stylus/**.styl'
            ],  
            
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
            nodeServer : './server.js',

            // JSX
            browserifyTarget: './public/app/reactscripts/main.jsx',
            mainReactApp: clientApp + 'scripts/app.js',
            jsxBundleDest: clientApp + 'scripts'
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
