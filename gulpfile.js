var require;

// External Dependencies
var gulp = require('gulp');
var args = require('yargs').argv;
var config = require('./gulp.config')();
var del = require('del');

var $ = require('gulp-load-plugins')({lazy: true});

// Suplementary Method Dependencies
var log = log;
var clean = clean;

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
        //.pipe($.autoprefixer({browsers: ['last 2 versions', '> 5%']}))
        .pipe(gulp.dest(config.cssDir));
    
    done();
});

//@ clean-styles
gulp.task('clean-styles', function (done) {

    'use strict';
    
    var files = config.cssDir + '**/custom.css';
    
    clean(files, done);
    done();
    
});

//@ stylus-watcher
gulp.task('stylus-watcher', function(){
    
    gulp.watch([config.stylus], ['styles']);
    
});

gulp.task('wiredep', function(){
    
    log("Wire up the bower CSS and JS");
    
    var options = config.getWiredepDefaultOptions(),
        wiredep = require('wiredep').stream;
    
    return gulp
        .src(config.jade)
        .pipe(wiredep(options))
        .pipe($.inject(gulp.src(config.js)))
        .pipe(gulp.dest(config.layoutTmps))
});

gulp.task('inject', ['wiredep', 'styles'], function(){
    
    log("Wire up the custom CSS into the html, and call wiredep");

    return gulp
        .src(config.jade)
        .pipe($.inject(gulp.src(config.css)))
        .pipe(gulp.dest(config.layoutTmps))
});

///////////

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