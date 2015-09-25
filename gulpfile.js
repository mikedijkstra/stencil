var gulp = require('gulp');

gulp.task('default', function() {
  var assets = {
    javascripts: [
      './node_modules/jquery/dist/jquery.js',
      './node_modules/modernizr/modernizr.js',
      './node_modules/respond.js/dest/respond.min.js',
      './node_modules/bootstrap-sass/assets/javascripts/*',
      './node_modules/bootstrap-sass/assets/javascripts/*/**',
    ],
    stylesheets: [
      './node_modules/bootstrap-sass/assets/stylesheets/*',
      './node_modules/bootstrap-sass/assets/stylesheets/*/**',
    ]
  };

  for (var type in assets) {
    gulp.src(assets[type]).pipe(gulp.dest('assets/' + type + '/lib'));
  };
});
