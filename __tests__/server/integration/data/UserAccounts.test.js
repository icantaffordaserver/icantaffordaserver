/**
 * Created by alexandermann on 2016-12-15.
 */
process.env.NODE_ENV = 'test';
jest.disableAutomock();

const knexfile     = require('../../../../knexfile')[process.env.NODE_ENV];
const knex         = require('knex')(knexfile);
const UserAccounts = require('../../../../server/models/UserAccounts').UserAccounts;
const UserProfiles = require('../../../../server/models/UserAccounts').UserProfiles;

describe('UserAccounts model testing...', () => {
    // before each test roll database back to initial state
    beforeEach(async() => {
        await knex.migrate.rollback();
        await knex.migrate.latest();
        // await knex.seed.run();
    });

    // return database to empty at the end of the testing
    afterAll(async() => {
        await knex.migrate.rollback();
    });

    it('should not have any accounts', async() => {
        let allAccounts = await UserAccounts.fetchAll();
        expect(allAccounts.toJSON()).toHaveLength(0);
    });

    it('should save a model to the database', async() => {
        let newUserAccount = await new UserAccounts({
            email: 'test@test.com',
            password_hash: 'someRandomHash'
        }).save(null, {method: 'insert'});

        expect(newUserAccount.toJSON().id).toBeDefined();
        expect(newUserAccount.toJSON().email).toBeDefined();
    });

    it('UserAccounts.signUpUser() should sign a user up and return user account and profile data', async() => {
        let newUser = await UserAccounts.signUpUser('Alexander', 'alexander.mann@me.com', 'somepassword');
        expect(newUser.toJSON().id).toBeDefined(); // should have same uuid for profile and account table
        expect(newUser.toJSON().email).toBe('alexander.mann@me.com');
        expect(newUser.toJSON().email_verified_token).toBeDefined();
        expect(newUser.toJSON().profile.first_name).toBe('Alexander');
        expect(newUser.toJSON().password).toBeUndefined();
    });

    it('UserAccounts.signUpUser() should return error if duplicate email is submitted', () => {

    });

});