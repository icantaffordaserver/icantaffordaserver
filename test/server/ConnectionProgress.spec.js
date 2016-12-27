/**
 * Created by alexandermann on 2016-12-15.
 */

const chai               = require('chai');
const chaiAsPromised     = require('chai-as-promised');
const moment             = require('moment');
const knex               = require('knex')(require('../../knexfile'));
const Connections        = require('../../server/models/UserAccounts').Connections;
const UserAccounts       = require('../../server/models/UserAccounts').UserAccounts;
const ConnectionProgress = require('../../server/models/UserAccounts').ConnectionProgress;

const expect = chai.expect;
const should = chai.should();

chai.use(chaiAsPromised);


describe('Simulate two users being matched, Connections model testing...', () => {
    // before each test roll database back to initial state
    before(function () {
        return knex.migrate.rollback()
            .then(function () {
                return knex.migrate.latest();
            })
            .then(() => {
                return knex.seed.run();
            });
    });

    // return database to empty at the end of the testing
    after(function () {
        return knex.migrate.rollback();
    });

    // We have three users already specified in the DB, hard code these
    const user1     = '48244142-7761-4982-a808-4b27e8bd1bd7';
    const user2     = '682fdee0-78d4-42fc-9e56-b865e519912a';
    const adminUser = 'acb91cc4-bc20-4da0-adcc-626a3aee64fb';
    let connection_id;

    it('should seed the initial database set 1 connection with the status "scheduled"', () => {
        return UserAccounts.fetchAll()
            .then(accounts => {
                expect(accounts.toJSON().length).to.equal(3);
                return new Connections({status: 'matched', matched_by: adminUser}).save(null, {method: 'insert'});
            })
            .then(connection => {
                connection_id = connection.toJSON().id; // save the uuid of the connection just made
                expect(connection.toJSON()).to.have.property('id');
                expect(connection.toJSON().status).to.equal('matched');
                expect(connection.toJSON().matched_by).to.equal(adminUser);
                return connection.accounts().attach([user1, user2]);
            })
            .then(() => {
                return new Connections({id: connection_id}).save({status: 'scheduled'}, {patch: true})

            })
            .then(connection => {
                expect(connection.toJSON().status).to.equal('scheduled');
                return knex.select().from('users_connections');
            })
            .then(usersConnections => {
                expect(usersConnections.length).to.equal(2);
                expect(usersConnections[0]).to.have.property('user_account_id');
                expect(usersConnections[1]).to.have.property('user_account_id');
            });
    });

    it('create a new connection_progress row and should show that a user just completed the firestarter', () => {
        return new ConnectionProgress({
            user_account_id: user1,
            connection_id: connection_id,
            firestarter_complete: true,
            firestarter_complete_date: moment().utc().format('YYYY-MM-DDTHH:mm:ss.SSS')
        }).save(null, {method: 'insert'})
            .then(connectionProgress => {
                expect(connectionProgress.toJSON().user_account_id).to.equal(user1);
                expect(connectionProgress.toJSON().connection_id).to.equal(connection_id);
                expect(connectionProgress.toJSON().firestarter_complete).to.equal(true);
            });
    });

    it('should update an existing connection_progress row and show that a user just completed their connection', () => {
        return new ConnectionProgress().where({
            user_account_id: user1,
            connection_id: connection_id
        }).fetch()
            .then(connectionProgress => {
                return connectionProgress.save({
                    connection_complete: true,
                    connection_complete_date: moment().utc().format('YYYY-MM-DDTHH:mm:ss.SSS')
                }, {patch: true})
            })
            .then(connectionProgress => {
                expect(connectionProgress.toJSON().user_account_id).to.equal(user1);
                expect(connectionProgress.toJSON().connection_id).to.equal(connection_id);
                expect(connectionProgress.toJSON().firestarter_complete).to.equal(true);
                expect(connectionProgress.toJSON().connection_complete).to.equal(true);
            });
    });
});
