'use strict';

var db = require('../mongo')();

exports.index = function(req, res, next) {
  var users = db.collection('users');
  users.find().toArray(function(err, docs) {
    if(err) {
      return next(err);
    }
    res.send({ users: docs });
  });
};

exports.create = function(req, res, next) {
  if(!req.body.name) {
    return res.status(400).send({ message: 'Name required.' });
  }

  var user = { name: req.body.name };

  var users = db.collection('users');
  users.insert(user, function(err, result) {
    if(err) {
      return next(err);
    }
    res.send(result.ops[0]);
  });
};
