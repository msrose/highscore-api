'use strict';

const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const eslint = require('gulp-eslint');

const jsFiles = [
  'gulpfile.js',
  'index.js',
  '{app,spec,config}/**/*.js'
];

gulp.task('start', () => {
  nodemon({ script: 'index.js' });
});

gulp.task('lint', () => {
  gulp.src(jsFiles)
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('watch', () => {
  gulp.watch(jsFiles, ['lint']);
});

gulp.task('default', ['start', 'lint', 'watch']);
