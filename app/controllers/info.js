'use strict';

const config = require('../../config/config');

exports.version = (req, res, next) => {
  res.send({ version: config.version });
};
