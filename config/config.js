'use strict';

var _ = require('lodash');
var fs = require('fs');
var pkg = require('../package.json');

var config = {
  all: {
    version: pkg.version
  },
  development: {
    port: 1337,
    mongoUrl: 'mongodb://localhost:27017/highscoreapi'
  },
  staging: {
    port: process.env.PORT,
    mongoUrl: process.env.MONGO_URL
  }
};

var envConfig = config[process.env.NODE_ENV || 'development'];
module.exports = _.extend(config.all, envConfig);
