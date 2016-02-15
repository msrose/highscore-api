'use strict';

const db = require('../mongo')();

exports.index = (req, res, next) => {
  let users = db.collection('users');
  users.find().toArray((err, users) => {
    if(err) {
      return next(err);
    }
    res.send({ users });
  });
};

exports.create = (req, res, next) => {
  if(!req.body.name) {
    return res.status(400).send({ message: 'Name required.' });
  }

  let user = { name: req.body.name };

  let users = db.collection('users');
  users.insert(user, (err, result) => {
    if(err) {
      return next(err);
    }
    res.send(result.ops[0]);
  });
};
