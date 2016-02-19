'use strict';

const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const eslint = require('gulp-eslint');
const spawn = require('child_process').spawn;

const jsFiles = [
  'gulpfile.js',
  'index.js',
  '{app,spec,config}/**/*.js'
];

gulp.task('start', () => {
  nodemon({ script: 'index.js' });
});

gulp.task('test', (done) => {
  spawn('node', ['spec/support/runner'], { stdio: 'inherit' }).on('close', done);
});

gulp.task('lint', () => {
  return gulp.src(jsFiles)
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('watch', () => {
  gulp.watch(jsFiles, ['lint']);
});

gulp.task('default', ['start', 'lint', 'watch']);
