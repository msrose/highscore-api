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
    .post(users.validateBody, users.create);

  app.route('/users/:userId')
    .get(users.show)
    .put(users.validateBody, users.update)
    .delete(users.delete);

  app.param('userId', middleware.validateId('userId'));
  app.param('userId', users.findById);
};
