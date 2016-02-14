'use strict';

var config = require('../../config/config');

exports.info = function(req, res, next) {
  res.send({ version: config.version });
};
