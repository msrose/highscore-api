'use strict';

const pkg = require('../package.json');

const config = {
  all: {
    port: 1337,
    version: pkg.version,
    httpLogFormat: 'combined'
  },
  development: {
    mongoUrl: 'mongodb://localhost:27017/highscoreapi',
    httpLogFormat: 'dev'
  },
  test: {
    mongoUrl: 'mongodb://localhost:27017/highscoreapitest',
    httpLogFormat: () => {}
  },
  staging: {
    port: process.env.PORT,
    mongoUrl: process.env.MONGO_URL
  },
  production: {
    port: process.env.PORT,
    mongoUrl: process.env.MONGO_URL
  }
};

if(!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development';
}

let envConfig = config[process.env.NODE_ENV];
module.exports = Object.assign(config.all, envConfig);
