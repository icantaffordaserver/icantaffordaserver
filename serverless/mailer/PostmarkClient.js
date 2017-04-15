/**
 * Created by alexandermann on 2017-04-14.
 */
// Require
const postmark = require('postmark');

const config = require('../config');
const { POSTMARK_API_KEY } = config;

// Example request
module.exports = new postmark.Client(POSTMARK_API_KEY);
