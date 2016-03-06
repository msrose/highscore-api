'use strict';

function* sequencer() {
  for(let i = 0; ; i++) {
    yield i;
  }
}

let seq = sequencer();

exports.User = function(attrs) {
  attrs = attrs || {};
  let id = seq.next().value;
  return Object.assign({
    first_name: 'Test',
    last_name: 'User',
    username: `tuser${id}`,
    email: `test${id}@example.com`
  }, attrs);
};
