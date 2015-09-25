var gulp = require('gulp');

gulp.task('default', function() {
  var assets = {
    'assets/javascripts/lib': [
      './node_modules/bootstrap-sass/assets/javascripts/bootstrap.js',
    ],
    'assets/stylesheets/lib': [
      './node_modules/bootstrap-sass/assets/stylesheets/*',
      './node_modules/bootstrap-sass/assets/stylesheets/*/**',
    ]
  };

  for (var folder in assets) {
    gulp.src(assets[folder]).pipe(gulp.dest(folder));
  };
});
