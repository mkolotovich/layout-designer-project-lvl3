'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
var pug = require('gulp-pug');
var svgSprite = require('gulp-svg-sprite');
var concat = require('gulp-concat');
var gulpCopy = require('gulp-copy');
var outputPath = './dist/';
 
gulp.task('copy', function() {
  return gulp.src('./app/images/*.jpg')
    .pipe(gulpCopy(outputPath,{ prefix: 1 }))
});

gulp.task('scripts', function() {
  return gulp.src('./app/*.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./dist/'));
});
 
gulp.task('sprite', function() {
  return gulp.src('./app/**/*.svg')
  .pipe(svgSprite({
    mode: {
      stack: {
        sprite: "../sprite.svg"  //sprite file name
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
  return gulp.src('./app/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/'));
});
 
gulp.task('sass:watch', function () {
  gulp.watch('./app/**/*.scss', ['sass']);
});