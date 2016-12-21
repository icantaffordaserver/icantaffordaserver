const crypto    = require('crypto');
const bcrypt    = require('bcrypt-nodejs');
const bookshelf = require('../config/bookshelf');

let UserAccounts = bookshelf.Model.extend({
        tableName: 'user_accounts',
        idAttribute: 'id',
        hasTimestamps: true,

        initialize: function () {
            this.on('saving', this.hashPassword, this);
        },

        // for all relations, make sure to RETURN
        profile: function () {
            return this.hasOne(UserProfiles, 'user_account_id')
        },

        // this function is called when the object fires the event 'saving' and it checks if an attribute
        // password was passed.
        // seems like this is run every time the UserAccounts fires the 'saving' event.
        // This may be unnecessary then and rework into functions only where the password
        // is required to be saved...
        hashPassword: function (model, attrs, options) {
            // attrs are attributes that will be inserted or updated, if present
            var password = options.patch ? attrs.password_hash : model.get('password_hash');
            if (!password) {
                return;
            }
            return new Promise(function (resolve, reject) {
                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(password, salt, null, function (err, hash) {
                        if (options.patch) {
                            attrs.password_hash = hash;
                        }
                        model.set('password_hash', hash);
                        resolve();
                    });
                });
            });
        },

        comparePassword: function (password, done) {
            let model = this;
            bcrypt.compare(password, model.get('password_hash'), function (err, isMatch) {
                done(err, isMatch);
            });
        },

        // use the visibility plugin to hide these fields
        hidden: ['password_hash', 'passwordResetToken', 'passwordResetExpires'],

        virtuals: {
            gravatar: function () {
                if (!this.get('email')) {
                    return 'https://gravatar.com/avatar/?s=200&d=retro';
                }
                var md5 = crypto.createHash('md5').update(this.get('email')).digest('hex');
                return 'https://gravatar.com/avatar/' + md5 + '?s=200&d=retro';
            }
        }
    },

    // Class/Static functions and properties attached to the constructor
    {
        dependents: ['profile'], // specify the dependent relations for cascade-delete plugin

        // Use a transaction wrapper and sign a user up. Returns a Promise
        // Take a name, email and password, store in DB then return a promise to
        // the user account and related profile
        signUpUser: function (name, email, password) {
            //wrap the user sign up in a transaction
            return bookshelf.transaction(t => {
                // Step 1: generate a token to verify email
                return new Promise((resolve, reject) => {
                    crypto.randomBytes(16, function (err, buf) {
                        if (err) {
                            reject(err);
                        } else
                            resolve(buf.toString('hex'));
                    })
                }).then((token) => {
                    // Step 2: insert the email, password, and generated token into user_accounts DB table
                    return new UserAccounts({
                        email: email,
                        password_hash: password,
                        email_verified_token: token
                    }).save(null, {
                        transacting: t,
                        method: 'insert'
                    });
                }).then(account => {
                    // Step 3: insert name into user_profiles DB Table
                    return new UserProfiles({user_account_id: account.toJSON().id, first_name: name}).save(null, {
                        transacting: t,
                        method: 'insert'
                    });
                })
            }).then(profile => {
                // Step 4: return the user as a promise
                // lookup the account and return the promise
                return UserAccounts.forge({id: profile.toJSON().user_account_id}).fetch({withRelated: 'profile'});
            });
        }
    }
);

let UserProfiles = bookshelf.Model.extend({
    tableName: 'user_profiles',
    idAttribute: 'user_account_id',
    hasTimestamps: true,

    account: function () {
        return this.belongsTo(UserAccounts, 'id');
    }
});

module.exports.UserAccounts = UserAccounts;
module.exports.UserProfiles = UserProfiles;
