'use strict';
// The entry file for the universal/isomorphic webapp

// ES6 Transpiler
require('babel-core/register')({});
require('babel-polyfill');

var server = require('./server');

server.set('port', process.env.PORT || 3000);

server.listen(server.get('port'), function(err) {
  if (err) throw err;
  console.log(`Express server listening on port ${server.get('port')}`);
});
