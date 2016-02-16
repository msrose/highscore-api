'use strict';

const ObjectID = require('mongodb').ObjectID;

exports.validateId = (prop) => {
  return (req, res, next) => {
    let id = req.params[prop];
    if(!ObjectID.isValid(id)) {
      return res.status(400).send({ message: `Invalid id "${id}"` });
    }
    req.params[prop] = ObjectID(req.params[prop]);
    next();
  };
};
