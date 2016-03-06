'use strict';

exports.up = (db, next) => {
  let users = db.collection('users');
  users.createIndex({ username: 1 }, { unique: true }).then(() => {
    return users.createIndex({ email: 1 }, { unique: true });
  }).then(() => next(), next);
};

exports.down = (db, next) => {
  let users = db.collection('users');
  users.dropIndexes().then(() => next(), next);
};
