'use strict';

process.env.NODE_ENV = 'test';

const Jasmine = require('jasmine');

const config = require('../../config/config');
const ConsoleReporter = require('jasmine-console-reporter');

let jasmine = new Jasmine();
let reporter = new ConsoleReporter({ cleanStack: 3 });

jasmine.loadConfigFile('spec/support/jasmine.json');
jasmine.addReporter(reporter);

jasmine.onComplete((passed) => {
  jasmine.exit(passed ? 0 : 1, process.platform, process.version, process.exit, jasmine.exit);
});

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
