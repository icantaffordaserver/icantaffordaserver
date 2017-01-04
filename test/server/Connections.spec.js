/**
 * Created by alexandermann on 2016-12-15.
 */
process.env.NODE_ENV = 'test';

const chai           = require('chai');
const chaiAsPromised = require('chai-as-promised');
const knex           = require('knex')(require('../../knexfile'));
const Connections    = require('../../server/models/UserAccounts').Connections;
const UserAccounts   = require('../../server/models/UserAccounts').UserAccounts;

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

    it('sanity check... DB should have 3 user accounts and 3 user profiles', () => {
        return UserAccounts.fetchAll().then(accounts => {
            expect(accounts.toJSON().length).to.equal(3);
        })
    });

    it('should simulate two users being matched', () => {
        return new Connections({status: 'matched', matched_by: adminUser}).save()
            .then(connection => {
                connection_id = connection.toJSON().id; // save the uuid of the connection just made
                expect(connection.toJSON()).to.have.property('id');
                expect(connection.toJSON().status).to.equal('matched');
                expect(connection.toJSON().matched_by).to.equal(adminUser);
                return connection.accounts().attach([user1, user2]);
            })
    });

    it('should update the connection status to "scheduled"', () => {
        return new Connections({id: connection_id}).save({status: 'scheduled'}, {patch: true})
            .then(connection => {
                expect(connection.toJSON().status).to.equal('scheduled');
            });
    });

    it('should get all the connections and check that there are only two users per connection', () => {
        return Connections.fetchAll({withRelated: 'accounts.profile'})
            .then(result => {
                // console.log(result.toJSON()[0].accounts);
                expect(result.toJSON()[0].accounts.length).to.equal(2);
            });
    });

    it('should delete a connection and its related info from the DB', () => {
        return new Connections({id: connection_id}).destroy()
            .then((connection) => {
                // take the current model and get all the models available
                return connection.fetchAll(); // could also have used Connections.fetchAll()
            })
            .then(connections=> {
                // check no connections exist
                expect(connections.toJSON().length).to.equal(0);
                return knex.select().from('users_connections');
            })
            .then((result)=> {
                // check that the users_connections table is empty
                expect(result.length).to.equal(0);
            });
    });
});
