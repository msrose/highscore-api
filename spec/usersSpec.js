'use strict';

const helper = require('./specHelper');
const request = helper.request;
const db = helper.db;
const app = helper.app;
const ObjectID = helper.ObjectID;
const users = db.collection('users');

describe('Users endpoints', () => {
  describe('POST /users', () => {
    it('adds a user when given valid attributes', (done) => {
      request(app)
      .post('/users')
      .send({ name: 'michael' })
      .expect(200)
      .end((err, res) => {
        expect(err).toBeNull();
        expect(res.body.name).toBe('michael');
        expect(res.body._id).toBeTruthy();
        users.findOne({ _id: ObjectID(res.body._id) }).then((user) => {
          expect(user.name).toBe('michael');
        }).then(done, done.fail);
      });
    });

    it('does not add a user when not given attributes', (done) => {
      request(app)
      .post('/users')
      .send({ llamas: 'michael' })
      .expect(400)
      .end((err, res) => {
        expect(err).toBeNull();
        expect(res.body.message).toBeTruthy();
        done();
      });
    });

    it('does not add a user with invalid attributes', (done) => {
      request(app)
      .post('/users')
      .send({ llamas: 'michael' })
      .expect(400)
      .end((err, res) => {
        expect(err).toBeNull();
        expect(res.body.message).toBeTruthy();
        done();
      });
    });
  });

  describe('GET /users', () => {
    beforeEach((done) => {
      users.insertOne({ name: 'hero boy' }).then(done, done.fail);
    });

    it('gets a list of the users', (done) => {
      request(app)
      .get('/users')
      .expect(200)
      .end((err, res) => {
        expect(err).toBeNull();
        let names = res.body.users.map(user => user.name);
        expect(names).toContain('hero boy');
        done();
      });
    });
  });

  describe('GET /users/:userId', () => {
    it('gets the user with the given id', (done) => {
      users.insertOne({ name: 'hero baby' }).then((result) => {
        let id = result.ops[0]._id;
        request(app)
        .get('/users/' + id)
        .expect(200)
        .end((err, res) => {
          expect(err).toBeNull();
          expect(res.body.name).toBe('hero baby');
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
        expect(res.body.message).toBeTruthy();
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
          expect(res.body.message).toBeTruthy();
          done();
        });
      }, done.fail);
    });
  });

  describe('PUT /users/:userId', () => {
    let user;

    beforeEach((done) => {
      users.insertOne({ name: 'hero boy' }).then((result) => {
        user = result.ops[0];
      }).then(done, done.fail);
    });

    it('updates the user attributes correctly', (done) => {
      request(app)
      .put('/users/' + user._id)
      .send({ name: 'new name' })
      .expect(200)
      .end((err, res) => {
        expect(err).toBeNull();
        expect(res.body.name).toBe('new name');
        users.findOne({ _id: ObjectID(res.body._id) }).then((user) => {
          expect(user.name).toBe('new name');
        }).then(done, done.fail);
      });
    });

    it('does not allow invalid attributes', (done) => {
      request(app)
      .put('/users/' + user._id)
      .send({ name: '' })
      .expect(400)
      .end((err, res) => {
        expect(err).toBeNull();
        expect(res.body.message).toBeTruthy();
        done();
      });
    });

    it('gives a not found response if the user does not exist', (done) => {
      users.drop().then(() => {
        request(app)
        .put('/users/56c284724e68ce93245de5d2')
        .send({ name: 'llama man' })
        .expect(404)
        .end((err, res) => {
          expect(err).toBeNull();
          expect(res.body.message).toBeTruthy();
          done();
        });
      }, done.fail);
    });
  });

  describe('DELETE /users/:userId', () => {
    it('removes the user from the database', (done) => {
      users.insertOne({ name: 'hero baby' }).then((result) => {
        let id = result.ops[0]._id;
        request(app)
        .delete('/users/' + id)
        .expect(200)
        .end((err, res) => {
          expect(err).toBeNull();
          expect(res.body.name).toBe('hero baby');
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
          expect(res.body.message).toBeTruthy();
          done();
        });
      }, done.fail);
    });
  });
});
