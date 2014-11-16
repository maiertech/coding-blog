var gulp = require('gulp');
var browserSync = require('browser-sync');
var cp = require('child_process');
var runSequence = require('run-sequence');
var bundle = process.platform === "win32" ? "bundle.bat" : "bundle";

var messages = {
  jekyllBuild: '<span style="color: grey">Running:</span> $ bundle exec jekyll build'
};

/**
 * Run Jekyll build in context of bundle:
 * bundle exec jekyll build
 */
gulp.task('jekyll-build', function (done) {
  browserSync.notify(messages.jekyllBuild);
  return cp.spawn(bundle, ['exec', 'jekyll', 'build'], {stdio: 'inherit'})
    .on('close', done);
});

/**
 * Run Jekyll build in context of bundle and do browser-sync reload.
 */
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
  browserSync.reload();
});

/**
 * Startup browser-sync after Jekyll build.
 */
gulp.task('browser-sync', ['jekyll-build'], function () {
  browserSync({
    server: {
      baseDir: '_site'
    }
  });
});

/**
 * Watch task:
 * Run jekyll-rebuild whenever changes occur.
 */
gulp.task('watch', function () {
  gulp.watch(['index.html',
      '_config.yml',
      '_plugins/**/*{.scss,.yml}',
      '_posts/**/*.md'],
    ['jekyll-rebuild']);
});

/**
 * Build task:
 * - fire up browser-sync after initial Jekyll build,
 * - fire up watchers.
 */
gulp.task('build', function () {
  runSequence('browser-sync', 'watch');
});

/**
 * Define build tasks as default task.
 */
gulp.task('default', ['build']);
