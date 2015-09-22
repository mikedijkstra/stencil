var _ = require('lodash'),
    gulp = require('gulp');
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    vfs = require('vinyl-fs'),
    concat = require('gulp-concat');

gulp.task('build', function() {
  var assets = {
    javascripts: [
      './bower_components/jquery/dist/jquery.js',
      './bower_components/modernizr/modernizr.js',
      './bower_components/respond.js/dest/respond.min.js',
      './bower_components/bootstrap-sass/assets/javascripts/**/*',
    ],
    stylesheets: [
      './bower_components/bootstrap-sass/assets/stylesheets/**/*',
      './bower_components/animate-sass/**/*',
    ]
  };

  for (var type in assets) {
    gulp.src(assets[type]).pipe(gulp.dest('./build/' + type + '/lib'));
  };

  gulp.src('./stylesheets/**/*').pipe(gulp.dest('./build/stylesheets'));
});


gulp.task('styles', function() {
  return sass('./build/stylesheets/stencil.scss', { style: 'expanded' })
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
    .pipe(gulp.dest('./build/stylesheets'));
});

gulp.task('scripts', function() {
  return gulp.src('./javascripts/*')
  .pipe(concat('stencil.js'))
  .pipe(gulp.dest('./build/javascripts/'))
});

gulp.task('default', ['build', 'styles', 'scripts'], function() {});
