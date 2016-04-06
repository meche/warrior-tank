'use strict'

var gulp = require('gulp');
var autoPrefixer = require( 'autoprefixer-stylus' );
var browserSync = require( 'browser-sync' );
var clean = require( 'gulp-clean' );
var concat = require( 'gulp-concat' );
var htmlMin = require( 'gulp-htmlmin' );
var imageMin = require( 'gulp-imagemin' );
var koutoSwiss = require( 'kouto-swiss' );
var jade = require( 'gulp-jade' );
var jeet = require( 'jeet' );
var jsHint = require( 'gulp-jshint' );
var map = require( 'map-stream' );
var rename = require( 'gulp-rename' );
var rupture = require( 'rupture' );
var sourceMaps = require( 'gulp-sourcemaps' );
var stylus = require ( 'gulp-stylus' );
var uglify = require( 'gulp-uglify' );

var jadeForest = {
    appJs: 'app/**/*.js',
    css: 'assets/stylesheet/**/*.styl',
    cssStylus: 'assets/stylesheet/styles.styl',
    html: 'dev/**/*.html',
    img: 'assets/images/**/*',
    jade: 'assets/**/*.jade',
    js: 'assets/javascript/**/*.js'
};

var kunlaiSummit = {
    css: 'dev/css/',
    dev: 'dev/',
    img: 'dev/img/',
    js: 'dev/js/'
};

var eternalBlossoms = {
    css: 'dist/css/',
    img: 'dist/img/',
    js: 'dist/js/',
    dist: 'dist/'
};

var myReporter = map(function (file, cb) {
  if (!file.jshint.success) {
    console.log('JSHINT fail in '+file.path);
    file.jshint.results.forEach(function (err) {
      if (err) {
        console.log(' '+file.path + ': line ' + err.line + ', col ' + err.character + ', code ' + err.code + ', ' + err.reason);
      }
    });
  }
  cb(null, file);
});

// Clear folder dist

gulp.task( 'clean', function() {
    return gulp.src( jadeForest.html )
        .pipe( clean() );
} );

// compiler css with Stylus

gulp.task( 'css', function() {
    gulp.src( jadeForest.cssStylus )
        .pipe( sourceMaps.init() )
        .pipe( stylus( {
            use: [koutoSwiss(), autoPrefixer(), jeet(), rupture()],
            compress: true
        } ) )
        .pipe( sourceMaps.write( './' ) )
        .pipe( gulp.dest( kunlaiSummit.css ) )
        .pipe( browserSync.reload( {
            stream: true
        } ) );
} );

// compiler jade

gulp.task( 'jade', function() {
    gulp.src( jadeForest.jade )
        .pipe( jade( {
            pretty: true
        } ) )
        .pipe( gulp.dest( kunlaiSummit.dev ) );
} );

// lint javascript

gulp.task( 'lint', function() {
  return gulp.src( jadeForest.js )
    .pipe( jsHint() )
    .pipe( myReporter );
} );

// browserSync

gulp.task( 'browserSync', function() {
    browserSync( {
        server: {
            baseDir: kunlaiSummit.dev
        }
    } )
} );

// Watch files... PULL THE BOSS!!

gulp.task( 'pullTheBoss', ['browserSync'], function() {
    gulp.watch( jadeForest.css, ['css'] );
    gulp.watch( jadeForest.jade, ['jade'] );
    gulp.watch( jadeForest.html, browserSync.reload );
} );
