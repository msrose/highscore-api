'use strict';

exports.User = function(attrs) {
  attrs = attrs || {};
  return Object.assign({
    first_name: 'Test',
    last_name: 'User',
    username: 'tuser',
    email: 'test@example.com'
  }, attrs);
};
