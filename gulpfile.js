/////////// CONFIGURATION

// External Dependencies
var gulp = require('gulp');
var args = require('yargs').argv;
var browserSync = require("browser-sync");
var reload = browserSync.reload;
var config = require('./gulp.config')();
var del = require('del');
var port = process.env.PORT || config.defaultPort;
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var reactify = require('reactify');

// Load all plugins
var $ = require('gulp-load-plugins')({lazy: true});

// Suplementary Method Dependencies
var log = log;
var clean = clean;

/////////// TASKS

/* ******* HELPER TASKS ******* */

//@ help
gulp.task('help', $.taskListing);

//@ default
gulp.task('default', ['help']);

/* ******* END OF HELPER TASKS ******* */


/* ******* CLEANING TASKS ******* */

//@ clean
gulp.task('clean', function (done) {

    'use strict';
    
    // This pattern also concats arrays into an array
    var files = [].concat(config.build);
    
    log('Cleaning: ' + $.util.colors.blue(files));
    
    del(files, done);
    done();
    
});

//@ clean-styles
gulp.task('clean-styles', function (done) {

    'use strict';
    
    var files = config.cssDir + '**/custom.css';
    
    clean(files, done);
    done();
    
});

//@ clean-jsx
gulp.task('clean-jsx', function (done) {

    'use strict';

    var file = config.mainReactApp;

    clean(file, done);
    done();

});

//@ clean-fonts
gulp.task('clean-fonts', function (done) {

    'use strict';
    
    var files = config.build + 'fonts/**/*.*';
    
    clean(files, done);
    done();
    
});

//@ clean-images
gulp.task('clean-images', function (done) {

    'use strict';
    
    var files = config.build + 'images/**/*.*';
    
    clean(files, done);
    done();
    
});

/* ******* END OF CLEANING TASKS ******* */


/* ******* WATCHER TASKS ******* */

//@ stylus-watcher
gulp.task('stylus-watcher', function () {
    'use strict';
    
    gulp.watch([config.stylus], ['styles']);
    
});

//@ jade-watcher
gulp.task('jade-watcher', function () {
    'use strict';
    
    gulp.watch([config.allJade])
        .on('change', browserSync.reload);
    
});

//@ jsx-watcher
gulp.task('jsx-watcher', function () {
    'use strict';
    
    gulp.watch([config.allJsx], ['bundle-jsx'])
        .on('change', browserSync.reload);

});

/* ******* END OF WATCHER TASKS ******* */


/* ******* INJECTING TASKS ******* */

//@ bundle-jsx
gulp.task('bundle-jsx', function () {
    'use strict';
    
    return browserify({
        entries:  config.browserifyTarget,
        debug: true
    })
        .transform(reactify)
        .bundle()
        .pipe(source('app.js'))
        .pipe(gulp.dest(config.jsxBundleDest));

});

//@ vet
gulp.task('vet', function () {
    'use strict';
    
    log('Analyzing source with JSHint and JSCS');
    
    return gulp
        .src(config.alljs)
        .pipe($.if(args.verbose, $.print()))
        .pipe($.jscs())
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish', {verbose: true}))
        .pipe($.jshint.reporter('fail'));
});

//@ fonts
gulp.task('fonts', ['clean-fonts'], function () {
    'use strict';
    
    log('Copying our fonts');
    
    return gulp
        .src(config.fonts)
        .pipe($.if(args.verbose, $.print()))
        .pipe(gulp.dest(config.build + 'fonts'));
        
});

//@ images
gulp.task('images', ['clean-images'], function () {
    'use strict';
    
    log('Copying and compressing the images');
    
    return gulp
        .src(config.images)
        .pipe($.if(args.verbose, $.print()))
        .pipe($.imagemin({optimizationLevel: 4}))
        .pipe(gulp.dest(config.build + 'images'));
        
});

//@ styles
gulp.task('styles', ['clean-styles'], function (done) {
    'use strict';
    
    log('Compiling Stylus --> CSS');
    
    return gulp
        .src(config.stylus)
        .pipe($.if(args.verbose, $.print()))
        .pipe($.plumber())
        .pipe($.stylus({
            compress: true
        }))
        .pipe($.autoprefixer({browsers: ['last 2 versions', '> 5%']}))
        .pipe($.concat('custom.min.css'))
        .pipe(gulp.dest(config.cssDir));

});

//@ wiredep
gulp.task('wiredep', ['bundle-jsx'], function () {
    'use strict';
    
    log("Wire up the bower CSS and JS");
    
    var options = config.getWiredepDefaultOptions(),
        wiredep = require('wiredep').stream;
    
    return gulp
        .src(config.jade)
        .pipe($.if(args.verbose, $.print()))
        .pipe(wiredep(options))
        .pipe($.inject(gulp.src(config.js, {read: false}), {ignorePath: 'public', addRootSlash: false }))
        .pipe(gulp.dest(config.layoutTmps));
});

//@ inject
gulp.task('inject', ['wiredep', 'styles'], function () {
    'use strict';
    
    log("Wire up the custom CSS into the html, and call wiredep");

    return gulp
        .src(config.jade)
        .pipe($.if(args.verbose, $.print()))
        .pipe($.inject(gulp.src(config.css, {read: false}), {ignorePath: 'public', addRootSlash: false }))
        .pipe($.plumber())
        .pipe(gulp.dest(config.layoutTmps));
});

//@ serve-dev
gulp.task('serve-dev', ['inject'], function () {
    'use strict';
    
    var isDev = true,
        nodeOptions = {
            script: config.nodeServer,
            ext: 'jade js',
            delayTime: 1,
            env: {
                'PORT': port,
                'NODE_ENV': isDev ? 'dev' : 'build'
            },
            watch: [config.server, config.nodeServer]
        
        };
    
    return $.nodemon(nodeOptions)
        .on('restart', function (ev) {
            log('*** Nodemon restarted');
            log('files changed on restart:\n' + ev);

            setTimeout(function () {

                browserSync.notify('reloading now...');
                reload({stream: false});

            }, config.browserReloadDelay);

        })
        .on('start', function () {
            log('*** Nodemon started');
            startBrowserSync();
        })
        .on('crash', function () {
            log('*** Nodemon crashed');
        })
        .on('exit', function () {
            log('*** Nodemon exited cleanly');
        });
    
});

/* ******* END OF INJECTING TASKS ******* */


/////////// SUPPLEMENTAL METHODS

//@ changeEvent
function changeEvent(event) {
    'use strict';
    
    var srcPattern = new RegExp('/.*(?=/' + config.source + ')/');
    log('File ' + event.path.replace(srcPattern, '') + ' ' + event.type);
    //browserSync.reload;
}

//@ startBrowserSync
function startBrowserSync() {
    'use strict';
    
    if (args.nosync || browserSync.active) {
        return;
    }
    
    log('Starting browser-sync on port ' + port);
    
    gulp.watch([config.stylus], ['styles'])
        .on('change', function (event) {

            changeEvent(event);

        });

    gulp.watch([config.allJsx], ['wiredep'])
        .on('change', function (event) {

            changeEvent(event);

        });

    var options = {
        proxy: 'localhost:' + port,
        port: 3000,
        files: [
            config.client + '**/*.*',
            config.css,
            config.allJsx,
            config.server + '**/*.jade',
            '!' + config.client + '**/*.styl',
            '!' + config.client + 'vendor/**/*.*',
            config.nodeServer
        ],
        ghostMode: {
            clicks: true,
            location: false,
            froms: true,
            scroll: true
        },
        injectChanges: true,
        logFileChanges: true,
        logLevel: 'debug',
        logPrefix: 'gulp-patterns',
        notify: true,
        reloadDelay: 0 //1000
    };
    log('Options have been loaded');
    browserSync(options);
    
}

//@ clean
function clean(path, done) {
    'use strict';
    
    log('Cleaning: ' + $.util.colors.blue(path));
    del(path, done);
    
}

//@ log
function log(msg) {
    'use strict';
    
    var item;
    
    if (typeof (msg) === 'object') {
        for (item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.blue(msg[item]));
            }
        }
    } else {
        $.util.log($.util.colors.blue(msg));
    }
    
}
