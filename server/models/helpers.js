/**
 * Created by alexandermann on 2017-01-09.
 */
const crypto = require('crypto');
const bookshelf = require('../config/bookshelf');
const UserAccounts = require('./UserAccounts').UserAccounts;
const UserProfiles = require('./UserAccounts').UserProfiles;

// TODO: fix the naming of this shit

// Helpers

/**
 * Generate a unique token
 * @returns {Promise.<void>}
 */
export async function generateUniqueToken() {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(16, (err, buf) => {
      if (err) {
        reject(err);
      } else {
        resolve(buf.toString('hex'));
      }
    });
  });
}

/**
 * Create a user in the database
 *
 * @param firstName
 * @param lastName
 * @param email
 * @param password
 * @returns {Promise.<*>}
 */
export async function createUser(firstName, lastName, email, password) {
  // wrap the user sign up in a transaction
  return bookshelf.transaction(async (t) => {
    try {
      // Step 1: generate a token to verify email
      const token = generateUniqueToken();
      // Step 2: insert the email, password, and generated token into user_accounts DB table
      const newUser = await new UserAccounts({
        email,
        password_hash: password,
        email_verified_token: token,
      }).save(null, {
        transacting: t,
        method: 'insert',
      });
      // Step 3: insert name into user_profiles DB Table
      await new UserProfiles({
        user_account_id: newUser.toJSON().id,
        first_name: firstName,
        last_name: lastName,
      }).save(null, {
        transacting: t,
        method: 'insert',
      });
      // Step 4: return the user as a promise
      // lookup the account and return the promise
      return newUser.fetch({ transacting: t, withRelated: 'profile' });
    } catch (err) {
      throw err;
    }
  });
}
