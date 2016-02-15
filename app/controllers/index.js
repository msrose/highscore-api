'use strict';

const config = require('../../config/config');

exports.info = (req, res, next) => {
  res.send({ version: config.version });
};
