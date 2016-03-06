'use strict';

const helper = require('./specHelper');
const request = helper.request;
const db = helper.db;
const app = helper.app;
const factories = helper.factories;
const ObjectID = helper.ObjectID;
const users = db.collection('users');

describe('Users endpoints', () => {
  describe('POST /users', () => {
    it('adds a user when given valid attributes', (done) => {
      request(app)
      .post('/users')
      .send({
        username: 'msrose',
        first_name: 'Michael',
        last_name: 'Rose',
        email: 'michael@example.com'
      })
      .expect(200)
      .end((err, res) => {
        expect(err).toBeNull();
        let expectedBody = jasmine.objectContaining({
          username: 'msrose',
          first_name: 'Michael',
          last_name: 'Rose',
          email: 'michael@example.com'
        });
        let user = res.body.data && res.body.data.user || {};
        expect(user).toEqual(expectedBody);
        users.findOne({ _id: ObjectID(user._id) }).then((user) => {
          expect(user).toEqual(expectedBody);
        }).then(done).catch(done.fail);
      });
    });

    it('does not add a user when not given bad attributes', (done) => {
      request(app)
      .post('/users')
      .send(factories.User({ llamas: 'michael' }))
      .expect(400)
      .end((err, res) => {
        expect(err).toBeNull();
        expect(res.body.error && res.body.error.message).toBeTruthy();
        done();
      });
    });

    it('does not add a user with invalid attributes', (done) => {
      request(app)
      .post('/users')
      .send(factories.User({ first_name: '' }))
      .expect(400)
      .end((err, res) => {
        expect(err).toBeNull();
        expect(res.body.error && res.body.error.message).toBeTruthy();
        done();
      });
    });

    it('requires all of the attributes to be present', (done) => {
      request(app)
      .post('/users')
      .send({ first_name: 'llama' })
      .expect(400)
      .end((err, res) => {
        expect(err).toBeNull();
        expect(res.body.error && res.body.error.message).toBeTruthy();
        done();
      });
    });

    it('requires a unique username', (done) => {
      let user = factories.User();
      users.insertOne(user).then((result) => {
        request(app)
        .post('/users')
        .send(factories.User({ username: user.username }))
        .expect(400)
        .end((err, res) => {
          expect(err).toBeNull();
          expect(res.body.error && res.body.error.message).toBeTruthy();
          done();
        });
      }, done.fail);
    });

    it('requires a unique email', (done) => {
      let user = factories.User();
      users.insertOne(user).then((result) => {
        request(app)
        .post('/users')
        .send(factories.User({ email: user.email }))
        .expect(400)
        .end((err, res) => {
          expect(err).toBeNull();
          expect(res.body.error && res.body.error.message).toBeTruthy();
          done();
        });
      }, done.fail);
    });
  });

  describe('GET /users', () => {
    beforeEach((done) => {
      users.insertOne(factories.User({ first_name: 'hero boy' }))
      .then(done).catch(done.fail);
    });

    it('gets a list of the users', (done) => {
      request(app)
      .get('/users')
      .expect(200)
      .end((err, res) => {
        expect(err).toBeNull();
        let names = res.body.data &&
          res.body.data.users &&
          res.body.data.users.map(user => user.first_name);
        expect(names).toContain('hero boy');
        done();
      });
    });
  });

  describe('GET /users/:userId', () => {
    it('gets the user with the given id', (done) => {
      users.insertOne(factories.User({ first_name: 'hero baby' })).then((result) => {
        let id = result.ops[0]._id;
        request(app)
        .get('/users/' + id)
        .expect(200)
        .end((err, res) => {
          expect(err).toBeNull();
          let firstName = res.body.data && res.body.data.user && res.body.data.user.first_name;
          expect(firstName).toBe('hero baby');
          done();
        });
      }, done.fail);
    });

    it('gives a bad request response with an invalid id', (done) => {
      request(app)
      .get('/users/not-an-id')
      .expect(400)
      .end((err, res) => {
        expect(err).toBeNull();
        expect(res.body.error && res.body.error.message).toBeTruthy();
        done();
      });
    });

    it('gives a not found response with a non-existant id', (done) => {
      users.drop().then(() => {
        request(app)
        .get('/users/56c284724e68ce93245de5d2')
        .expect(404)
        .end((err, res) => {
          expect(err).toBeNull();
          expect(res.body.error && res.body.error.message).toBeTruthy();
          done();
        });
      }, done.fail);
    });
  });

  describe('PUT /users/:userId', () => {
    let user;

    beforeEach((done) => {
      users.insertOne(factories.User({
        first_name: 'old name'
      })).then((result) => {
        user = result.ops[0];
      }).then(done).catch(done.fail);
    });

    it('updates the user attributes correctly', (done) => {
      request(app)
      .put('/users/' + user._id)
      .send(factories.User({ first_name: 'new name' }))
      .expect(200)
      .end((err, res) => {
        expect(err).toBeNull();
        let user = res.body.data && res.body.data.user || {};
        expect(user.first_name).toBe('new name');
        users.findOne({ _id: ObjectID(user._id) }).then((user) => {
          expect(user.first_name).toBe('new name');
        }).then(done).catch(done.fail);
      });
    });

    it('does not allow invalid attributes', (done) => {
      request(app)
      .put('/users/' + user._id)
      .send(factories.User({ first_name: '' }))
      .expect(400)
      .end((err, res) => {
        expect(err).toBeNull();
        expect(res.body.error && res.body.error.message).toBeTruthy();
        done();
      });
    });

    it('does not add a user when not given bad attributes', (done) => {
      request(app)
      .put('/users/' + user._id)
      .send(factories.User({ llamas: 'michael' }))
      .expect(400)
      .end((err, res) => {
        expect(err).toBeNull();
        expect(res.body.error && res.body.error.message).toBeTruthy();
        done();
      });
    });

    it('requires all of the attributes to be present', (done) => {
      request(app)
      .put('/users/' + user._id)
      .send({ first_name: 'michael' })
      .expect(400)
      .end((err, res) => {
        expect(err).toBeNull();
        expect(res.body.error && res.body.error.message).toBeTruthy();
        done();
      });
    });

    it('gives a not found response if the user does not exist', (done) => {
      users.drop().then(() => {
        request(app)
        .put('/users/56c284724e68ce93245de5d2')
        .send(factories.User())
        .expect(404)
        .end((err, res) => {
          expect(err).toBeNull();
          expect(res.body.error && res.body.error.message).toBeTruthy();
          done();
        });
      }, done.fail);
    });
  });

  describe('DELETE /users/:userId', () => {
    it('removes the user from the database', (done) => {
      users.insertOne(factories.User({ first_name: 'hero baby' })).then((result) => {
        let id = result.ops[0]._id;
        request(app)
        .delete('/users/' + id)
        .expect(200)
        .end((err, res) => {
          expect(err).toBeNull();
          let firstName = res.body.data && res.body.data.user && res.body.data.user.first_name;
          expect(firstName).toBe('hero baby');
          users.findOne({ _id: ObjectID(id) }).then((user) => {
            expect(user).toBeNull();
            done();
          }, done.fail);
        });
      }, done.fail);
    });

    it('gives a not found error if the user does not exist', (done) => {
      users.drop().then(() => {
        request(app)
        .delete('/users/56c284724e68ce93245de5d2')
        .expect(404)
        .end((err, res) => {
          expect(err).toBeNull();
          expect(res.body.error && res.body.error.message).toBeTruthy();
          done();
        });
      }, done.fail);
    });
  });
});
