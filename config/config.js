'use strict';

var _ = require('lodash');
var pkg = require('../package.json');

var config = {
  all: {
    port: 1337,
    version: pkg.version
  },
  development: {
    mongoUrl: 'mongodb://localhost:27017/highscoreapi'
  },
  test: {
    mongoUrl: 'mongodb://localhost:27017/highscoreapitest'
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

var envConfig = config[process.env.NODE_ENV || 'development'];
module.exports = _.extend(config.all, envConfig);
