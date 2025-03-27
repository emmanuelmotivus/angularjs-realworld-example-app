// Angular 12 updated gulpfile.js
const gulp = require('gulp');
const notify = require('gulp-notify');
const browserSync = require('browser-sync').create();
const { exec } = require('child_process');
const merge = require('merge-stream');
const uglify = require('gulp-uglify');

// Where our files are located
// Note: Angular CLI will handle compilation of TypeScript files and templates
const srcDir = "src";
const distDir = "dist";
const buildDir = "dist"; // Using Angular CLI's output directory

// Error handler
const interceptErrors = function(error) {
  const args = Array.prototype.slice.call(arguments);

  // Send error to notification center with gulp-notify
  notify.onError({
    title: 'Compile Error',
    message: '<%= error.message %>'
  }).apply(this, args);

  // Keep gulp from hanging on this task
  this.emit('end');
};

// Build task - uses Angular CLI instead of browserify
gulp.task('build-dev', function(done) {
  // Run Angular CLI build command
  exec('ng build', function(err, stdout, stderr) {
    console.log(stdout);
    console.error(stderr);
    done(err);
  });
});

// HTML task - copies index.html (though Angular CLI will handle this too)
gulp.task('html', function() {
  return gulp.src(`${srcDir}/index.html`)
    .on('error', interceptErrors)
    .pipe(gulp.dest(buildDir));
});

// Production build task
gulp.task('build-prod', function(done) {
  // Run Angular CLI production build
  exec('ng build --configuration production', function(err, stdout, stderr) {
    console.log(stdout);
    console.error(stderr);
    done(err);
  });
});

// This task is used for building production ready
// minified JS/CSS files into the dist/ folder
// Note: Angular CLI already handles minification, but keeping this for compatibility
gulp.task('build', gulp.series('build-prod'), function() {
  // Angular CLI already handles these operations
  // This is kept for backward compatibility
  return gulp.src(`${distDir}/**/*`);
});

// Default task - development build with watch
gulp.task('default', gulp.series('build-dev', function(done) {
  browserSync.init({
    server: buildDir,
    port: 4200,
    notify: false,
    ui: {
      port: 4201
    }
  });

  // Watch for changes and trigger rebuilds
  // Note: Most file watching is now handled by Angular CLI
  gulp.watch(`${srcDir}/**/*.html`, gulp.series('build-dev'));
  gulp.watch(`${srcDir}/**/*.ts`, gulp.series('build-dev'));
  gulp.watch(`${srcDir}/**/*.scss`, gulp.series('build-dev'));
  
  // Watch for changes in the build directory and reload the browser
  gulp.watch(`${buildDir}/**/*`).on('change', browserSync.reload);
  
  done();
}));

// Legacy tasks maintained for backward compatibility
// These are now no-ops or delegated to Angular CLI
gulp.task('browserify', gulp.series('build-dev'));
gulp.task('views', function(done) {
  // No longer needed as Angular handles templates differently
  done();
});