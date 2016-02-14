'use strict';

var users = require('./controllers/users');
var index = require('./controllers/index');

module.exports = function(app) {
  app.route('/')
    .get(index.info);

  app.route('/users')
    .get(users.index)
    .post(users.create);
};
