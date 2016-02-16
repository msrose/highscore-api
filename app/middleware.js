'use strict';

const ObjectID = require('mongodb').ObjectID;

exports.validateId = (req, res, next) => {
  let id = req.params.id;
  if(!ObjectID.isValid(id)) {
    return res.status(400).send({ message: `Invalid id "${id}"` });
  }
  req.params.id = ObjectID(req.params.id);
  next();
};

