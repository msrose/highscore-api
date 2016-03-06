'use strict';

const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const eslint = require('gulp-eslint');
const spawn = require('child_process').spawn;
const rimraf = require('rimraf');
const fs = require('fs');

const jsFiles = [
  'gulpfile.js',
  'index.js',
  '{app,spec,config,migrations}/**/*.js'
];

gulp.task('start', () => {
  nodemon({ script: 'index.js' });
});

gulp.task('test', (done) => {
  spawn('node', ['spec/support/runner'], { stdio: 'inherit' })
    .on('close', done);
});

gulp.task('lint', () => {
  return gulp.src(jsFiles)
    .pipe(eslint())
    .pipe(eslint.format());
});

let migrate = (direction, done) => {
  const mongoConfigFileName = `mongo-config-${Date.now()}.json`;
  const config = require('./config/config');
  console.log('Migrating for %s environment: %s', process.env.NODE_ENV, config.mongoUrl);
  const content = {
    mongoAppDb: {
      connectionString: config.mongoUrl
    }
  };
  fs.writeFile(mongoConfigFileName, JSON.stringify(content), (err) => {
    if(err) {
      return done(err);
    }
    spawn('node', [
      './node_modules/mongodb-migrate', '-runmm', '-cfg', mongoConfigFileName, direction
    ], { stdio: 'inherit' }).on('close', () => {
      rimraf(mongoConfigFileName, done);
    });
  });
};

gulp.task('migrate', (done) => {
  migrate('up', done);
});

gulp.task('migrate:down', (done) => {
  migrate('down', done);
});

gulp.task('watch', () => {
  gulp.watch(jsFiles, ['lint']);
});

gulp.task('default', ['start', 'lint', 'watch']);
