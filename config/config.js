'use strict';

const pkg = require('../package.json');

const config = {
  all: {
    version: pkg.version,
    port: process.env.PORT,
    mongoUrl: process.env.MONGO_URL,
    httpLogFormat: 'combined'
  },
  development: {
    port: 1337,
    mongoUrl: 'mongodb://localhost:27017/highscoreapi',
    httpLogFormat: 'dev'
  },
  test: {
    mongoUrl: 'mongodb://localhost:27017/highscoreapitest',
    httpLogFormat: () => {}
  },
  staging: {
  },
  production: {
  }
};

if(!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development';
}

let envConfig = config[process.env.NODE_ENV];
module.exports = Object.assign(config.all, envConfig);
