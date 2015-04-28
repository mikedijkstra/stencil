var _ = require('lodash'),
    gulp = require('gulp');

gulp.task('default', function() {
  var assets = {
    javascripts: [
      './bower_components/jquery/dist/jquery.js',
      './bower_components/modernizr/modernizr.js',
      './bower_components/respond.js/dest/respond.min.js',
      './bower_components/bootstrap-sass/assets/javascripts/*',
      './bower_components/bootstrap-sass/assets/javascripts/*/**',
    ],
    stylesheets: [
      './bower_components/bootstrap-sass/assets/stylesheets/*',
      './bower_components/bootstrap-sass/assets/stylesheets/*/**',
    ]
  };

  for (var type in assets) {
    gulp.src(assets[type]).pipe(gulp.dest('./build/' + type + '/lib'));
  };
});


var vfs = require('vinyl-fs');
var converter = require('sass-convert');
 
gulp.task('convert', function() {
  vfs.src('./build/stylesheets/**/*.+(sass|scss|css)')
    .pipe(converter({
      from: 'sass',
      to: 'scss',
    }))
    .pipe(vfs.dest('./output'));
});
