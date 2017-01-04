/**
 * Created by alexandermann on 2016-12-15.
 */
process.env.NODE_ENV = 'test';

const chai           = require('chai');
const chaiAsPromised = require('chai-as-promised');
const knex           = require('knex')(require('../../knexfile'));
const Invites   = require('../../server/models/UserAccounts').Invites;

const expect = chai.expect;
const should = chai.should();

chai.use(chaiAsPromised);


describe('Invites model testing...', () => {
    // before each test roll database back to initial state
    // beforeEach(function () {
    //     return knex.migrate.rollback()
    //         .then(function () {
    //             return knex.migrate.latest();
    //         });
    // });

    // return database to empty at the end of the testing
    // after(function () {
    //     return knex.migrate.rollback();
    // });

    it('should not have any models', () => {
        Invites.forge().fetch().then(result => {
            console.log(result);
        });
        return Invites.forge().fetch().should.eventually.equal(null); //using chai-as-promised
    });



});