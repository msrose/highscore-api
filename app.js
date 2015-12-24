var express = require('express');
var bodyParser = require('body-parser');

module.exports = function(db) {
  var app = express();

  app.use(bodyParser.json());

  app.route('/users')
  .get(function(req, res, next) {
    var users = db.collection('users');
    users.find().toArray(function(err, docs) {
      if(err) {
        return next(err);
      }
      res.send({ users: docs });
    });
  })
  .post(function(req, res, next) {
    var user = req.body;

    if(!user.name) {
      return res.status(400).send({ message: 'Name required.' });
    }

    var users = db.collection('users');
    users.insert(user, function(err, result) {
      if(err) {
        return next(err);
      }
      console.log('Inserted user', user);
      res.send(result.ops[0]);
    });
  });

  app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send({ message: 'Something went wrong!' });
  });

  return app;
};
