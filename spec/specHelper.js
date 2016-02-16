'use strict';

const request = require('supertest');
const db = require('../app/mongo')();
const app = require('../app/express')();

module.exports = {
  request,
  db,
  app
};
