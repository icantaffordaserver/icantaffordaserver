var gulp = require('gulp')
var sass = require('gulp-sass')
var browserSync = require('browser-sync').create()
var header = require('gulp-header')
var cleanCSS = require('gulp-clean-css')
var rename = require('gulp-rename')
var uglify = require('gulp-uglify')
var pkg = require('./package.json')
var autoprefixer = require('gulp-autoprefixer')
var concat = require('gulp-concat')
var imagemin = require('gulp-imagemin')
var minifyHTML = require('gulp-minify-html')

// Compiles SCSS files from /scss into /css
gulp.task('sass', function() {
  return gulp
    .src('scss/creative.scss')
    .pipe(sass())
    .pipe(gulp.dest('css'))
    .pipe(browserSync.reload({ stream: true }))
})

// Minify compiled CSS
gulp.task('minify-css', ['sass'], function() {
  return gulp
    .src('css/*.css')
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
    .pipe(concat('style.min.css'))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.reload({ stream: true }))
})

// Minify custom JS
gulp.task('minify-js', function() {
  return gulp
    .src('js/creative.js')
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.reload({ stream: true }))
})

// Copy vendor files from /node_modules into /vendor
// NOTE: requires `npm install` before running!
gulp.task('copy', function() {
  gulp.src('vendor/**').pipe(gulp.dest('dist/vendor'))
})

gulp.task('html', function() {
  gulp
    .src('*.html')
    .pipe(minifyHTML())
    .pipe(gulp.dest('dist/'))
})

gulp.task('images', function() {
  gulp.src('img/*').pipe(gulp.dest('dist/img'))
})

// Default task
gulp.task('default', ['sass', 'minify-css', 'minify-js', 'copy'])

// Configure the browserSync task
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'dist/',
    },
  })
})

gulp.task(
  'build',
  ['sass', 'minify-css', 'minify-js', 'copy', 'images', 'html', 'browserSync'],
  function() {
    gulp.watch('scss/*.scss', ['sass'])
    gulp.watch('css/*.css', ['minify-css'])
    gulp.watch('js/*.js', ['minify-js'])
    // Reloads the browser whenever HTML or JS files change
    gulp.watch('*.html', browserSync.reload)
    gulp.watch('css/*.css', browserSync.reload)
    gulp.watch('js/**/*.js', browserSync.reload)
  },
)

// Dev task with browserSync
gulp.task(
  'dev',
  ['browserSync', 'sass', 'minify-css', 'html', 'minify-js'],
  function() {
    gulp.watch('scss/*.scss', ['sass'])
    gulp.watch('css/*.css', ['minify-css'])
    gulp.watch('js/*.js', ['minify-js'])
    // Reloads the browser whenever HTML or JS files change
    gulp.watch('*.html', browserSync.reload)
    gulp.watch('css/*.css', browserSync.reload)
    gulp.watch('js/**/*.js', browserSync.reload)
  },
)
