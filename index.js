'use strict';

const config = require('./config/config');
const connect = require('./app/mongo');
const logger = require('./app/logger');

connect(config.mongoUrl, (err, db) => {
  if(err) {
    return logger.error('Could not connect to mongo:', err);
  }
  logger.info('Connected to mongo.');

  let app = require('./app/express')();
  let server = app.listen(config.port, () => {
    logger.info('Server started on port %s', server.address().port);
  });
});
