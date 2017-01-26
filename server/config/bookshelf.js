const environment = process.env.NODE_ENV;
const config = require('../../knexfile')[environment];
const knex = require('knex')(config);
const bookshelf = require('bookshelf')(knex);
const cascadeDelete = require('bookshelf-cascade-delete');

bookshelf.plugin('virtuals');
bookshelf.plugin('visibility'); // see https://github.com/tgriesser/bookshelf/wiki/Plugin:-Visibility
bookshelf.plugin(cascadeDelete); // see https://github.com/seegno/bookshelf-cascade-delete

module.exports = bookshelf;
