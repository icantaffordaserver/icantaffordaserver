/**
 * Created by alexandermann on 2016-12-15.
 */
process.env.NODE_ENV = 'test';
jest.disableAutomock();

const moment             = require('moment');
const knexfile           = require('../../../../knexfile')[process.env.NODE_ENV];
const knex               = require('knex')(knexfile);
const Connections        = require('../../../../server/models/UserAccounts').Connections;
const UserAccounts       = require('../../../../server/models/UserAccounts').UserAccounts;
const ConnectionProgress = require('../../../../server/models/UserAccounts').ConnectionProgress;

describe('Simulate two users being matched, Connections model testing...', () => {
    // before each test roll database back to initial state
    beforeAll(async() => {
        await knex.migrate.rollback();
        await knex.migrate.latest();
        await knex.seed.run();
    });

    // return database to empty at the end of the testing
    afterAll(async() => {
        await knex.migrate.rollback();
    });

    // We have three users already specified in the DB from seed files, hard code these
    const user1     = '48244142-7761-4982-a808-4b27e8bd1bd7';
    const user2     = '682fdee0-78d4-42fc-9e56-b865e519912a';
    const adminUser = 'acb91cc4-bc20-4da0-adcc-626a3aee64fb';
    let connection_id;

    it('should seed the initial database set 1 connection with the status "scheduled"', async() => {
        let allAccounts = await UserAccounts.fetchAll();
        expect(allAccounts.toJSON()).toHaveLength(3); // check there are 3 user accounts
        let newConnection = await new Connections({
            status: 'matched',
            matched_by: adminUser
        }).save(null, {method: 'insert'});
        expect(newConnection.toJSON().id).toBeDefined();
        expect(newConnection.toJSON().status).toBe('matched');
        expect(newConnection.toJSON().matched_by).toBe(adminUser);
        connection_id = newConnection.toJSON().id; // globally save the uuid of the connection just made
        await newConnection.accounts().attach([user1, user2]); // add users to junction table users_connections

        let updatedConnection = await new Connections({id: connection_id}).save({status: 'scheduled'}, {patch: true});
        expect(updatedConnection.toJSON().status).toBe('scheduled');

        let usersConnections = await knex.select().from('users_connections');
        expect(usersConnections).toHaveLength(8); // we have 3 connections seeded, we added one more, therefore 8 entries in users_connections
        expect(usersConnections[0].user_account_id).toBeDefined();
        expect(usersConnections[1].user_account_id).toBeDefined();
    });

    it('create a new connection_progress row and should show that a user just completed the firestarter', async() => {
        let connectionProgress = await new ConnectionProgress({
            user_account_id: user1,
            connection_id: connection_id,
            firestarter_complete: true,
            firestarter_complete_date: moment().utc().format('YYYY-MM-DDTHH:mm:ss.SSS')
        }).save(null, {method: 'insert'});
        expect(connectionProgress.toJSON().user_account_id).toBe(user1);
        expect(connectionProgress.toJSON().connection_id).toBe(connection_id);
        expect(connectionProgress.toJSON().firestarter_complete).toBe(true);
    });

})
;
