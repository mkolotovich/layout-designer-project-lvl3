'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
var pug = require('gulp-pug');
var svgSprite = require('gulp-svg-sprite');
var concat = require('gulp-concat');
var gulpCopy = require('gulp-copy');
var outputPath = './build/';
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var data = require('gulp-data');
var fs = require('fs');

gulp.task('serve', function() {

  browserSync.init({
      server: {
        baseDir: "./build/"
      }
  });

  gulp.watch("./build/*.html").on('change', reload);
});

gulp.task('watch', function () {
  gulp.watch(['./app/**/*.pug','./app/**/*.json'], gulp.parallel('views'));
  gulp.watch('./app/**/*.svg', gulp.parallel('sprite'));
  gulp.watch('./app/scss/**/*.scss', gulp.parallel('sass'));
});

gulp.task('copy-with-depth', function() {
  return gulp.src('./app/images/*.jpg')
    .pipe(gulpCopy(outputPath,{ prefix: 1 }))
});

gulp.task('copy', function() {
  return gulp.src(['./node_modules/jquery/dist/jquery.min.js','./node_modules/bootstrap/dist/js/bootstrap.min.js'])
    .pipe(gulp.dest('./build/js'));
});

gulp.task('scripts', function() {
  return gulp.src('./app/js/*.js')
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./build/'));
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
  .pipe(gulp.dest('./build/images/icons'));
});

gulp.task('views', function buildHTML() {
  return gulp.src('./app/*.pug')
  .pipe(data(function(file) {
    return JSON.parse(fs.readFileSync('./app/pug/contacts-data.json'))
   }))
  .pipe(pug({}))
  .pipe(gulp.dest('./build'))
  .pipe(browserSync.stream());
});
 
sass.compiler = require('node-sass');
 
gulp.task('sass', function () {
  return gulp.src('./app/scss/app.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./build/'));
});

gulp.task('start', gulp.parallel('serve', 'watch'));
gulp.task('build', gulp.series('copy-with-depth', 'copy','sprite','views','sass'));