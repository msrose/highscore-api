'use strict';

var express = require('express');
var bodyParser = require('body-parser');

module.exports = function(db) {
  var app = express();

  app.use(function(req, res, next) {
    console.log(req.method, req.url);
    next();
  });

  app.use(bodyParser.json());

  require('./routes')(app);

  app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send({ message: 'Something went wrong!' });
  });

  return app;
};
