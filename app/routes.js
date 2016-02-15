'use strict';

const users = require('./controllers/users');
const index = require('./controllers/info');

module.exports = (app) => {
  app.route('/version')
    .get(index.version);

  app.route('/users')
    .get(users.index)
    .post(users.create);

  app.route('/').get((req, res, next) => {
    let routes = [];
    app._router.stack.forEach((r) => {
      if(r.route) {
        routes.push({
          path: r.route.path,
          methods: r.route.methods
        });
      }
    });
    res.send({ routes });
  });
};
