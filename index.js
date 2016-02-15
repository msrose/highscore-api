'use strict';

const config = require('./config/config');
const connect = require('./app/mongo');

connect(config.mongoUrl, (err, db) => {
  if(err) {
    return console.error('Could not connect to mongo:', err);
  }
  console.log('Connected to mongo.');

  let app = require('./app/express')();
  let server = app.listen(config.port, () => {
    console.log('Server started on port %s', server.address().port);
  });
});
