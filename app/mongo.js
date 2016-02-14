'use strict';

var mongo = require('mongodb').MongoClient;

var connection;

module.exports = function(url, callback) {
  if(!connection) {
    mongo.connect(url, function(err, db) {
      if(err) {
        return callback(err);
      }
      connection = db;
      callback(null, db);
    });
  } else {
    return connection;
  }
};
