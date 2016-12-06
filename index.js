'use strict';

require('babel/register')({});

var server = require('./server');

const PORT = process.env.PORT || 3000;

server.listen(PORT, function (err) {
    if (err) throw err;
    console.log(`Server listening on http://localhost:${PORT}`);
});