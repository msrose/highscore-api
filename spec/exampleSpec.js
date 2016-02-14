'use strict';

var request = require('supertest');
var db = require('../app/mongo')();
var app = require('../app/express')();

describe('Users endpoints', function() {
  describe('POST /users', function() {
    it('adds a user when given a name', function(done) {
      request(app)
      .post('/users')
      .send({ name: 'michael' })
      .expect(200)
      .end(function(err, res) {
        expect(err).toBeNull();
        expect(res.body.name).toBe('michael');
        expect(res.body._id).toBeTruthy();
        done();
      });
    });

    it('does not add a user when not given a name', function(done) {
      request(app)
      .post('/users')
      .send({ llamas: 'michael' })
      .expect(400)
      .end(function(err, res) {
        expect(err).toBeNull();
        expect(res.body.message).toBeTruthy();
        done();
      });
    });
  });

  describe('GET /users', function() {
    beforeEach(function(done) {
      var users = db.collection('users');
      users.insert({ name: 'hero boy' }, function(err, result) {
        if(err) return done.fail();
        done();
      });
    });

    it('GET /users gets a list of the users', function(done) {
      request(app)
      .get('/users')
      .expect(200)
      .end(function(err, res) {
        expect(err).toBeNull();
        var names = res.body.users.map(function(user) { return user.name; });
        expect(names).toContain('hero boy');
        done();
      });
    });
  });
});
