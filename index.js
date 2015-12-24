var express = require('express');
var config = require('./config')[process.env.NODE_ENV || 'development'];

var app = express();

app.get('/', function(req, res) {
  res.send({ message: 'Here we be!' });
});

var server = app.listen(config.port, function() {
  console.log('Server started on port %s', server.address().port);
});
