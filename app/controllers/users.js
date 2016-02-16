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
    return res.status(400).send({ message: 'Name required.' });
  }
  let user = { name: req.body.name };
  users.insertOne(user).then((result) => {
    res.send(result.ops[0]);
  }, next);
};

function notFound(id) {
  return { message: `No user found with id "${id}"` };
}

exports.show = (req, res, next) => {
  let id = req.params.id;
  users.findOne({ _id: id }).then((user) => {
    if(!user) {
      return res.status(404).send(notFound(id));
    }
    res.send(user);
  }, next);
};

exports.update = (req, res, next) => {
  if(!req.body.name) {
    return res.status(400).send({ message: 'Must provide a valid name' });
  }
  let id = req.params.id;
  let params = [
    { _id: id },
    { $set: { name: req.body.name } },
    { returnOriginal: false }
  ];
  users.findOneAndUpdate.apply(users, params).then((result) => {
    if(!result.value) {
      return res.status(404).send(notFound(id));
    }
    res.send(result.value);
  }, next);
};

exports.delete = (req, res, next) => {
  let id = req.params.id;
  users.findOneAndDelete({ _id: id }).then((result) => {
    if(!result.value) {
      return res.status(404).send(notFound(id));
    }
    res.send(result.value);
  }, next);
};
