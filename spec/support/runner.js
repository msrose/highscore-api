'use strict';

process.env.NODE_ENV = 'test';

var config = require('../../config/config');

var Jasmine = require('jasmine');
var jasmine = new Jasmine();

jasmine.loadConfigFile('spec/support/jasmine.json');

var connect = require('../../app/mongo');

connect(config.mongoUrl, function(err, db) {
  if(err) {
    return console.error('Could not connect to mongo');
  }
  db.dropDatabase(function(err, result) {
    if(err) {
      return console.error('Could not drop testing database.');
    }
    jasmine.execute();
  });
});
