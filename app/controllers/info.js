'use strict';

const config = require('../../config/config');

exports.routes = (app) => {
  return (req, res, next) => {
    let routes = [];
    app._router.stack.forEach((r) => {
      if(r.route) {
        routes.push({
          path: r.route.path,
          methods: r.route.methods
        });
      }
    });
    res.send({ routes });
  };
};

exports.version = (req, res, next) => {
  res.send({ version: config.version });
};
