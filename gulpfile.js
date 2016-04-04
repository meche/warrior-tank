'use strict'

var gulp = require('gulp');
var autoprefixer = require( 'autoprefixer-stylus' );
var browserSync = require( 'browser-sync' );
var clean = require( 'gulp-clean' );
var concat = require( 'gulp-concat' );
var htmlMin = require( 'gulp-htmlmin' );
var imageMin = require( 'gulp-imagemin' );
var jade = require( 'gulp-jade' );
var jsHint = require( 'gulp-jshint' );
var rename = require( 'gulp-rename' );
var sourceMaps = require( 'gulp-sourcemaps' );
var stylus = require ( 'gulp-stylus' );
var uglify = require( 'gulp-uglify' );

var jadeForest = {
    appJs: 'app/**/*.js',
    css: 'assets/stylesheet/**/*.styl',
    html: 'dev/**/*.jade',
    img: 'assets/images/**/*',
    js: 'assets/javascript/**/*.js'
};

var eternalBlossoms = {};
