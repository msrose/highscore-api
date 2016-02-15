'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const config = require('../config/config');

module.exports = () => {
  let app = express();

  app.use(morgan(config.httpLogFormat));

  app.use(helmet());
  app.use(cors());
  app.use(bodyParser.json());

  require('./routes')(app);

  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ message: 'Something went wrong!' });
  });

  return app;
};
