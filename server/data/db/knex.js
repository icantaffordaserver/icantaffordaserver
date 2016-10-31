/**
 * Created by AlexanderMann on 2016-10-18.
 */
var environment = process.env.NODE_ENV || 'development';
var config = require('../../../knexfile')[environment];

module.exports = require('knex')(config);

