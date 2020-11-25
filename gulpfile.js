'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
var pug = require('gulp-pug');
var svgSprite = require('gulp-svg-sprite');
var concat = require('gulp-concat');
 
gulp.task('scripts', function() {
  return gulp.src('./app/*.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./dist/'));
});
 
gulp.src('./app/*.svg')
  .pipe(svgSprite(/* ... Insert your configuration here ... */))
  .pipe(gulp.dest('./dist/'));

gulp.task('views', function buildHTML() {
  return gulp.src('./app/*.pug')
  .pipe(pug({
    // Your options in here.
  }))
});
 
sass.compiler = require('node-sass');
 
gulp.task('sass', function () {
  return gulp.src('./app/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist'));
});
 
gulp.task('sass:watch', function () {
  gulp.watch('./app/**/*.scss', ['sass']);
});