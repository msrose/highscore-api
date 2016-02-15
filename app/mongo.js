'use strict';

const mongo = require('mongodb').MongoClient;

let connection;

module.exports = (url, callback) => {
  if(!connection) {
    mongo.connect(url, (err, db) => {
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
