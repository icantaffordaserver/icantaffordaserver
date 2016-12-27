/**
 * Created by alexandermann on 2016-12-15.
 */

const chai           = require('chai');
const chaiAsPromised = require('chai-as-promised');
const knex           = require('knex')(require('../../knexfile'));
const UserAccounts   = require('../../server/models/UserAccounts').UserAccounts;
const UserProfiles   = require('../../server/models/UserAccounts').UserProfiles;

const expect = chai.expect;
const should = chai.should();

chai.use(chaiAsPromised);


describe('UserAccounts model testing...', () => {
    // before each test roll database back to initial state
    beforeEach(function () {
        return knex.migrate.rollback()
            .then(function () {
                return knex.migrate.latest();
            });
    });

    // return database to empty at the end of the testing
    // after(function () {
    //     return knex.migrate.rollback();
    // });

    it('should not have any models', () => {
        return UserAccounts.forge().fetch().should.eventually.equal(null); //using chai-as-promised
    });

    it('should save a model to the database', () => {
        let newUserAccount = new UserAccounts({
            email: 'test@test.com',
            password_hash: 'someRandomHash'
        }).save();

        // check the returned data
        newUserAccount.should.eventually.have.deep.property('attributes.email', 'test@test.com');
        newUserAccount.should.eventually.have.deep.property('attributes.password_hash');
    });

    it('should add a user account to the db then look it up', () => {
        // store in the db
        let newUserAccount = new UserAccounts({
            email: 'test@test.com',
            password_hash: 'someRandomHash'
        }).save();

        return newUserAccount.then((userAccount) => {
            expect(userAccount.toJSON()).to.have.property('email', 'test@test.com'); //dealing with promises the mocha way, remember to return the promise
        });
    });

    it('UserAccounts.signUpUser() should sign a user up and return user account and profile data', () => {
        return UserAccounts.signUpUser('Alexander', 'alexander.mann@me.com', 'somepassword')
            .then(data => {
                expect(data.toJSON().id).to.equal(data.toJSON().profile.user_account_id); // should have same uuid for profile and account table
                expect(data.toJSON().email).to.equal('alexander.mann@me.com');
                expect(data.toJSON().email_verified_token).to.exist;
                expect(data.toJSON().profile.first_name).to.equal('Alexander');
                expect(data.toJSON().password).to.be.undefined;
            })
    });

    it('UserAccounts.signUpUser() should return error if duplicate email is submitted', () => {

    });

});