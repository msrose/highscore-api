'use strict';

const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const methodOverride = require('method-override');
const morgan = require('morgan');

const config = require('../config/config');
const logger = require('./logger');

module.exports = () => {
  let app = express();

  app.use(helmet());
  app.use(methodOverride());
  app.use(cors());
  app.use(morgan(config.httpLogFormat));
  app.use(bodyParser.json());

  require('./routes')(app);

  app.use((err, req, res, next) => {
    if(res.headersSent) {
      return next(err);
    }
    err.status = err.status || 500;
    res.status(err.status).send({
      message: err.message || 'Something went wrong!'
    });
    if(err.status === 500) {
      logger.error(err.stack);
    }
  });

  app.use((req, res, next) => {
    res.status(404).send({
      url: req.url,
      message: 'Not Found'
    });
  });

  return app;
};
