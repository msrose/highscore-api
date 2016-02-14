'use strict';

var config = require('./config/config');
var connect = require('./app/mongo');

connect(config.mongoUrl, function(err, db) {
  if(err) {
    return console.error('Could not connect to mongo:', err);
  }
  console.log('Connected to mongo.');

  var app = require('./app/express')(db);
  var server = app.listen(config.port, function() {
    console.log('Server started on port %s', server.address().port);
  });
});
