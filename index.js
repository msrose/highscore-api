var config = require('./config')[process.env.NODE_ENV || 'development'];

var mongo = require('mongodb').MongoClient;

mongo.connect(config.mongoUrl, function(err, db) {
  if(err) {
    return console.error('Could not connect to mongo:', err);
  }

  console.log('Connected to mongo.');

  var app = require('./app')(db);
  var server = app.listen(config.port, function() {
    console.log('Server started on port %s', server.address().port);
  });
});
