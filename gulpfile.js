'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
var pug = require('gulp-pug');
var svgSprite = require('gulp-svg-sprite');
var concat = require('gulp-concat');
var gulpCopy = require('gulp-copy');
var outputPath = './dist/';
 
gulp.task('copy-with-depth', function() {
  return gulp.src('./app/images/*.jpg')
    .pipe(gulpCopy(outputPath,{ prefix: 1 }))
});

gulp.task('copy', function() {
  return gulp.src(['./node_modules/jquery/dist/jquery.min.js','./node_modules/bootstrap/dist/js/bootstrap.min.js'])
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('scripts', function() {
  return gulp.src('./app/js/*.js')
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./dist/'));
});
 
gulp.task('sprite', function() {
  return gulp.src('./app/**/*.svg')
  .pipe(svgSprite({
    mode: {
      stack: {
        sprite: "../sprite.svg"
      }
    }
  }))
  .pipe(gulp.dest('./dist/images/icons'));
});

gulp.task('views', function buildHTML() {
  return gulp.src('./app/*.pug')
  .pipe(pug({}))
  .pipe(gulp.dest('./dist'));
});
 
sass.compiler = require('node-sass');
 
gulp.task('sass', function () {
  return gulp.src('./app/scss/app.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/'));
});