'use strict';

const helper = require('./specHelper');
const request = helper.request;
const db = helper.db;
const app = helper.app;

describe('Users endpoints', () => {
  describe('POST /users', () => {
    it('adds a user when given a name', (done) => {
      request(app)
      .post('/users')
      .send({ name: 'michael' })
      .expect(200)
      .end((err, res) => {
        expect(err).toBeNull();
        expect(res.body.name).toBe('michael');
        expect(res.body._id).toBeTruthy();
        done();
      });
    });

    it('does not add a user when not given a name', (done) => {
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
      let users = db.collection('users');
      users.insert({ name: 'hero boy' }, (err, result) => {
        if(err) return done.fail();
        done();
      });
    });

    it('GET /users gets a list of the users', (done) => {
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
});
