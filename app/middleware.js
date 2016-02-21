'use strict';

const ObjectID = require('mongodb').ObjectID;

exports.validateId = (prop) => {
  return (req, res, next) => {
    let id = req.params[prop];
    if(!ObjectID.isValid(id)) {
      return next({ status: 400, message: `Invalid id "${id}"` });
    }
    req.params[prop] = ObjectID(req.params[prop]);
    next();
  };
};
