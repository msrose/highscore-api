'use strict';

const middleware = require('./middleware');
const users = require('./controllers/users');
const info = require('./controllers/info');

module.exports = (app) => {
  app.route('/').get(info.routes(app));

  app.route('/version')
    .get(info.version);

  app.route('/users')
    .get(users.index)
    .post(users.create);

  app.route('/users/:id')
    .get(users.show)
    .put(users.update)
    .delete(users.delete);

  app.param('id', middleware.validateId);
};
