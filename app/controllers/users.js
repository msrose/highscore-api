'use strict';

const db = require('../mongo')();
const users = db.collection('users');

exports.index = (req, res, next) => {
  users.find().toArray((err, users) => {
    if(err) {
      return next(err);
    }
    res.send({ users });
  });
};

exports.create = (req, res, next) => {
  if(!req.body.name) {
    return next({ status: 400, message: 'Name required' });
  }
  let user = { name: req.body.name };
  users.insertOne(user).then((result) => {
    res.send(result.ops[0]);
  }, next);
};

exports.findById = (req, res, next) => {
  let id = req.params.userId;
  users.findOne({ _id: id }).then((user) => {
    if(!user) {
      return next({ status: 404, message: `No user found with id "${id}"` });
    }
    req.user = user;
    next();
  }, next);
};

exports.show = (req, res, next) => {
  res.send(req.user);
};

exports.update = (req, res, next) => {
  if(!req.body.name) {
    return next({ status: 400, message: 'Must provide a valid name' });
  }
  let id = req.user._id;
  let params = [
    { _id: id },
    { $set: { name: req.body.name } },
    { returnOriginal: false }
  ];
  users.findOneAndUpdate.apply(users, params).then((result) => {
    res.send(result.value);
  }, next);
};

exports.delete = (req, res, next) => {
  let id = req.user._id;
  users.deleteOne({ _id: id }).then((result) => {
    res.send(req.user);
  }, next);
};
