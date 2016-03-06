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
    //duplicate value on unique index
    if(err.name === 'MongoError' && err.code === 11000) {
      err.status = 400;
      err.message = err.errmsg;
    }
    req.responseStatus = err.status || 500;
    if(req.responseStatus >= 500 && config.logErrors) {
      logger.error(err.stack);
    }
    req.responseError = {
      message: err.message || 'Something went wrong!'
    };
    next();
  });

  app.use((req, res, next) => {
    let status = req.responseStatus || 200;
    let responseBody = {
      _links: {
        self: { href: req.url }
      }
    };
    if(req.responseData) {
      responseBody.data = req.responseData;
    } else if(req.responseError) {
      req.responseError.status = status;
      responseBody.error = req.responseError;
    } else {
      status = 404;
      responseBody.error = { message: 'Not found', status };
    }
    res.status(status).send(responseBody);
  });

  return app;
};
