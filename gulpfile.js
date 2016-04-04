'use strict'

var gulp = require('gulp');
var autoPrefixer = require( 'autoprefixer-stylus' );
var browserSync = require( 'browser-sync' );
var clean = require( 'gulp-clean' );
var concat = require( 'gulp-concat' );
var htmlMin = require( 'gulp-htmlmin' );
var imageMin = require( 'gulp-imagemin' );
var jade = require( 'gulp-jade' );
var jsHint = require( 'gulp-jshint' );
var map = require( 'map-stream' );
var rename = require( 'gulp-rename' );
var sourceMaps = require( 'gulp-sourcemaps' );
var stylus = require ( 'gulp-stylus' );
var uglify = require( 'gulp-uglify' );

var jadeForest = {
    appJs: 'app/**/*.js',
    css: 'assets/stylesheet/**/*.styl',
    cssStylus: 'assets/stylesheet/styles.styl'
    html: 'dev/**/*.jade',
    img: 'assets/images/**/*',
    js: 'assets/javascript/**/*.js'
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
    return gulp.src( eternalBlossoms.dist )
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
        .pipe( sourceMaps.write() )
        .pipe( gulp.dest( eternalBlossoms.css ) );
} );

// lint javascript

gulp.task( 'lint', function() {
  return gulp.src( jadeForest.js, jadeForest.appJs )
    .pipe( jshint() )
    .pipe( myReporter );
} );
