var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var browserSync = require('browser-sync');
var ghPages = require('gulp-gh-pages');

gulp.task('deploy', tDeploy);

gulp.task('build', tBuild);

gulp.task('default', tDefault);

function tDefault() {
  browserSync.init({
    notify: false,
    port: 8080,
    server: {
      baseDir: ['app'],
      routes: {
        '/bower_components': 'bower_components'
      }
    }
  });
}

function tBuild() {
  gulp.src('./zlAudio.js')
    .pipe(gulp.dest('app'))
    .pipe(rename('zlAudio.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app'));
}

function tDeploy() {
  tBuild();
  gulp.src('./app/**/*')
    .pipe(gulp.dest('.tmp'));
  gulp.src('./bower_components/**/*')
    .pipe(gulp.dest('.tmp/bower_components'));

  return gulp.src('.tmp/**/*')
    .pipe(ghPages());
}
