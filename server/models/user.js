/**
 * Created by AlexanderMann on 2016-10-23.
 */
var DB = require('../../db').DB;
var bcrypt = require('bcryptjs');
var crypto = require('crypto');
var Promise = require('bluebird');

var bcryptGenSalt = Promise.promisify(bcrypt.genSalt);
var bcryptHash = Promise.promisify(bcrypt.hash);
var bcryptCompare = Promise.promisify(bcrypt.compare);

function generatePasswordHash(password) {
    return bcryptGenSalt().then(function (salt) {
        return bcryptHash(password, salt);
    });
}

var User = DB.Model.extend({
    tableName: 'users',
    idAttribute: 'id',
    hasTimestamps: true,
    profileData: function () {
        return this.hasOne(ProfileData);
    },
    profileAnswers: function () {
        return this.hasMany(ProfileAnswers);
    },
    connectionAnswers: function () {
        return this.hasMany(ConnectionAnswers);
    },
    connections: function () {
        return this.hasMany(Connections);
    }
}, {
    // static methods

    // returns a promise
    getById: function (id) {
        return this.forge().query({where: {id: id}}).fetch();
    },
    // returns a promise
    getByEmail: function (email, options) {
        options = options || {};

        return this.forge().query({where: {email: email.toLowerCase()}}).fetch();
    },

    // takes a user object and creates a new user in the database, returns a promise
    createUser: function (email, password) {

        //TODO get this promise hashPassword working
        // var hashPassword = generatePasswordHash(password);
        // hashPassword.then(function (pass) {
        //     console.log(`this is the hashed pw: ${pass}`);
        // });

        var pw = bcrypt.hashSync(password);

        // Generate the unique email confirmation token
        var seed = crypto.randomBytes(20);
        var confirmationToken = crypto.createHash('sha1').update(seed + email).digest('hex');

        return new this({
            email: email,
            password: pw,
            email_verified_token: confirmationToken
        }).save();
    },
    // TODO add user permissions and validation
    changeEmail: function (id, newEmail) {
        // Generate the unique email confirmation token
        var seed = crypto.randomBytes(20);
        var confirmationToken = crypto.createHash('sha1').update(seed + newEmail).digest('hex');

        return new this({id: id}).fetch().then(function (user) {
            return user.save({
                email: newEmail,
                email_verified: 0,
                email_verified_token: confirmationToken
            }, {patch: true});
        })
    },
    // TODO add user permissions and validation
    changePassword: function (id, newPassword) {
        var pw = bcrypt.hashSync(newPassword);

        return new this({id: id}).fetch().then(function (user) {
            return user.save({password: pw}, {patch: true});
        });
    }

});

module.exports = {
    User: User
};