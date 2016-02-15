'use strict';

const express = require('express');
const bodyParser = require('body-parser');

module.exports = () => {
  let app = express();

  if(process.env.NODE_ENV === 'development') {
    app.use((req, res, next) => {
      console.log(req.method, req.url);
      next();
    });
  }

  app.use(bodyParser.json());

  require('./routes')(app);

  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ message: 'Something went wrong!' });
  });

  return app;
};
