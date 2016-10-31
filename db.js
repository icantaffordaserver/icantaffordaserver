/**
 * Created by AlexanderMann on 2016-09-29.
 */

// follow for seed data
// http://mherman.org/blog/2016/04/28/test-driven-development-with-node/#.V_3AJZMrLXE

var knex = require('./server/data/db/knex');

// Just to test the knex functionality

// knex.schema.createTableIfNotExists('users', function (table) {
//     table.increments();
//     table.string('name');
//     table.timestamps();
// }).then(console.log('i got here dudes'));
//
// knex('users').insert({name: 'johnny'}).then(console.log('inserted johnny'));

var Bookshelf = require('bookshelf')(knex);

module.exports.DB = Bookshelf;
