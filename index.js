'use strict';

// ES6 Transpiler
require('babel-core/register')({});
require('babel-polyfill');

var server = require('./server');

const PORT = process.env.PORT || 3000;

server.listen(PORT, function (err) {
    if (err) throw err;
    console.log(`Server listening on http://localhost:${PORT}`);
});