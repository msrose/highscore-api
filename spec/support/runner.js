'use strict';

process.env.NODE_ENV = 'test';

const config = require('../../config/config');

const Jasmine = require('jasmine');
let jasmine = new Jasmine();

jasmine.loadConfigFile('spec/support/jasmine.json');

let connect = require('../../app/mongo');

connect(config.mongoUrl, (err, db) => {
  if(err) {
    return console.error('Could not connect to mongo');
  }
  db.dropDatabase((err, result) => {
    if(err) {
      return console.error('Could not drop testing database.');
    }
    jasmine.execute();
  });
});
