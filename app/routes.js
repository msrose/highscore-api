'use strict';

const users = require('./controllers/users');
const index = require('./controllers/index');

module.exports = (app) => {
  app.route('/')
    .get(index.info);

  app.route('/users')
    .get(users.index)
    .post(users.create);
};
