'use strict';

const db = require('../mongo')();
const users = db.collection('users');

exports.index = (req, res, next) => {
  users.find().toArray((err, users) => {
    if(err) {
      return next(err);
    }
    req.responseData = { users };
    next();
  });
};

exports.validateBody = (req, res, next) => {
  let attrs = {
    first_name: {
      validate: (value) => value !== undefined && value !== null && value !== ''
    },
    last_name: {
      validate: (value) => value !== undefined && value !== null && value !== ''
    },
    username: {
      validate: (value) => value !== undefined && value !== null && value !== ''
    },
    email: {
      validate: (value) => value.length >= 3 && value.indexOf('@') !== -1
    }
  };
  for(let prop in req.body) {
    if(!attrs[prop]) {
      return next({ status: 400, message: `Unexpected attribute "${prop}" in request body` });
    }
  }
  for(let prop in attrs) {
    if(!attrs[prop].validate(req.body[prop])) {
      return next({ status: 400, message: `Invalid value for attribute "${prop}"` });
    }
  }
  next();
};

exports.create = (req, res, next) => {
  let user = req.body;
  users.insertOne(user).then((result) => {
    req.responseData = { user: result.ops[0] };
    next();
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
  req.responseData = { user: req.user };
  next();
};

exports.update = (req, res, next) => {
  let id = req.user._id;
  let params = [
    { _id: id },
    { $set: req.body },
    { returnOriginal: false }
  ];
  users.findOneAndUpdate.apply(users, params).then((result) => {
    req.responseData = { user: result.value };
    next();
  }, next);
};

exports.delete = (req, res, next) => {
  let id = req.user._id;
  users.deleteOne({ _id: id }).then((result) => {
    req.responseData = { user: req.user };
    next();
  }, next);
};
