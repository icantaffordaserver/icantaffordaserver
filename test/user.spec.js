process.env.NODE_ENV = 'test';

var userModel = require('./user');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var should = chai.should();
var expect = chai.expect;
var knex = require('./knex');

chai.use(chaiAsPromised);

describe('User Model Tests', function () {

    // make sure the database is unchanged after every test
    beforeEach(function (done) {
        knex.migrate.rollback()
            .then(function () {
                knex.migrate.latest()
                    .then(function () {
                        return knex.seed.run()
                            .then(function () {
                                done();
                            });
                    });
            });
    });

    // roll back the database to empty state
    afterEach(function (done) {
        knex.migrate.rollback()
            .then(function () {
                done();
            });
    });

    it('getByEmail() should return user.attribute.email equal to alexander.mann@me.com', function () {
        var userEmailPromise = userModel.User.getByEmail('alexander.mann@me.com').then(function (user) {
            return user.attributes.email;
        });
        return expect(userEmailPromise).to.eventually.equal('alexander.mann@me.com');

    });

    it('getById() should return user.attribute.id equal to 1', function () {
        var userIdPromise = userModel.User.getById(1).then(function (user) {
            return user.attributes.id;
        });
        return expect(userIdPromise).to.eventually.equal(1);
    });

    it('createUser() should add new user to the database and check if the email matches the object returned from the database', function () {
        var newUserPromise = userModel.User.createUser('alexandermann11@gmail.com', 'baseball').then(function (user) {
            // console.log(user); // for seeing the returned DB object
            return user.attributes.email;
        });

        return expect(newUserPromise).to.eventually.equal('alexandermann11@gmail.com');
    });

    //TODO should query DB, store old object and compare with new object to test
    it('changeEmail() should change a users email, set to email not verified and send email to new address', function () {
        var newUserEmailPromise = userModel.User.changeEmail(1, 'alexandermann11@gmail.com').then(function (user) {
            // console.log(user);
            return user.attributes.email;
        });
        return expect(newUserEmailPromise).to.eventually.equal('alexandermann11@gmail.com');
    });

    it('changePassword() should hash and store new password and not equal the old password hash', function () {
        var testId = 1;
        var oldPassword = userModel.User.getById(testId).then(function (user) {
            return user.attributes.password;
        });
        var resetPasswordPromise = userModel.User.changePassword(testId, 'hey11').then(function (user) {
            return user.attributes.password;
        });
        return Promise.all([oldPassword, resetPasswordPromise]).then(function (values) {
            expect(values[0]).to.not.equal(values[1]);
        });
    });



});

