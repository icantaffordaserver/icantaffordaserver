

// The entry file for the universal/isomorphic webapp

// ES6 Transpiler
require('babel-core/register')({});
require('babel-polyfill');

const server = require('./server');
server.set('port', process.env.PORT || 3000);

server.listen(server.get('port'), (err) => {
  if (err) throw err;
  console.log(`Current Environment: ${server.get('env')}\nExpress server listening on port ${server.get('port')}`);
});

module.exports = server;
