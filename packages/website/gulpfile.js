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

// Set the banner content
var banner = [
  '/*!\n',
  ' * Start Bootstrap - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
  ' * Copyright 2013-' + new Date().getFullYear(),
  ' <%= pkg.author %>\n',
  ' * Licensed under <%= pkg.license %> (https://github.com/BlackrockDigital/<%= pkg.name %>/blob/master/LICENSE)\n',
  ' */\n',
  '',
].join('')

// Compiles SCSS files from /scss into /css
gulp.task('sass', function() {
  return gulp
    .src('scss/creative.scss')
    .pipe(sass())
    .pipe(
      header(banner, {
        pkg: pkg,
      }),
    )
    .pipe(gulp.dest('css'))
    .pipe(
      browserSync.reload({
        stream: true,
      }),
    )
})

// Minify compiled CSS
gulp.task('minify-css', ['sass'], function() {
  return gulp
    .src('css/*.css')
    .pipe(
      cleanCSS({
        compatibility: 'ie8',
      }),
    )
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
    .pipe(concat('style.min.css'))
    .pipe(gulp.dest('dist/css'))
    .pipe(
      browserSync.reload({
        stream: true,
      }),
    )
})

// Minify custom JS
gulp.task('minify-js', function() {
  return gulp
    .src('js/creative.js')
    .pipe(uglify())
    .pipe(
      header(banner, {
        pkg: pkg,
      }),
    )
    .pipe(
      rename({
        suffix: '.min',
      }),
    )
    .pipe(gulp.dest('dist/js'))
    .pipe(
      browserSync.reload({
        stream: true,
      }),
    )
})

// Copy vendor files from /node_modules into /vendor
// NOTE: requires `npm install` before running!
gulp.task('copy', function() {
  gulp
    .src([
      'node_modules/bootstrap/dist/**/*',
      '!**/npm.js',
      '!**/bootstrap-theme.*',
      '!**/*.map',
    ])
    .pipe(gulp.dest('dist/vendor/bootstrap'))

  gulp
    .src([
      'node_modules/jquery/dist/jquery.js',
      'node_modules/jquery/dist/jquery.min.js',
    ])
    .pipe(gulp.dest('dist/vendor/jquery'))

  gulp
    .src(['node_modules/magnific-popup/dist/*'])
    .pipe(gulp.dest('dist/vendor/magnific-popup'))

  gulp
    .src(['node_modules/scrollreveal/dist/*.js'])
    .pipe(gulp.dest('dist/vendor/scrollreveal'))

  gulp
    .src([
      'node_modules/popper.js/dist/umd/popper.js',
      'node_modules/popper.js/dist/umd/popper.min.js',
    ])
    .pipe(gulp.dest('dist/vendor/popper'))

  gulp
    .src(['node_modules/jquery.easing/*.js'])
    .pipe(gulp.dest('dist/vendor/jquery-easing'))

  gulp
    .src([
      'node_modules/font-awesome/**',
      '!node_modules/font-awesome/**/*.map',
      '!node_modules/font-awesome/.npmignore',
      '!node_modules/font-awesome/*.txt',
      '!node_modules/font-awesome/*.md',
      '!node_modules/font-awesome/*.json',
    ])
    .pipe(gulp.dest('dist/vendor/font-awesome'))
})

gulp.task('html', function() {
  gulp
    .src('*.html')
    .pipe(minifyHTML())
    .pipe(gulp.dest('dist/'))
})

gulp.task('images', function() {
  gulp
    .src('img/*')
    .pipe(
      imagemin({
        progressive: true,
      }),
    )
    .pipe(gulp.dest('dist/img'))
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

gulp.task('build', [
  'sass',
  'minify-css',
  'minify-js',
  'images',
  'html',
  'browserSync',
  'copy',
])

// Dev task with browserSync
gulp.task(
  'dev',
  ['browserSync', 'sass', 'minify-css', 'minify-js'],
  function() {
    gulp.watch('scss/*.scss', ['sass'])
    gulp.watch('css/*.css', ['minify-css'])
    gulp.watch('js/*.js', ['minify-js'])
    // Reloads the browser whenever HTML or JS files change
    gulp.watch('*.html', browserSync.reload)
    gulp.watch('css/style.min.css', browserSync.reload)
    gulp.watch('js/**/*.js', browserSync.reload)
  },
)
