/**
 * Created by alexandermann on 2016-12-15.
 */
process.env.NODE_ENV = 'test';
jest.disableAutomock();

const knexfile = require('../../../../knexfile')[process.env.NODE_ENV];
const knex = require('knex')(knexfile);
const Connections = require('../../../../server/models/UserAccounts').Connections;
const UserAccounts = require('../../../../server/models/UserAccounts').UserAccounts;

describe('Simulate two users being matched, Connections model testing...', () => {
    // before each test roll database back to initial state
  beforeAll(async () => {
    await knex.migrate.rollback();
    await knex.migrate.latest();
    await knex.seed.run();
  });

    // return database to empty at the end of the testing
  afterAll(async () => {
    await knex.migrate.rollback();
  });

    // We have three users already specified in the DB, hard code these
  const user1 = '48244142-7761-4982-a808-4b27e8bd1bd7';
  const user2 = '682fdee0-78d4-42fc-9e56-b865e519912a';
  const adminUser = 'acb91cc4-bc20-4da0-adcc-626a3aee64fb';
  let connection_id;

  it('sanity check... DB should have 3 user accounts and 3 user profiles', async () => {
    const allAccounts = await UserAccounts.fetchAll();
    expect(allAccounts.toJSON()).toHaveLength(3);
  });

  it('should simulate two users being matched', async () => {
    const connection = await new Connections({
      status: 'matched',
      matched_by: adminUser,
    }).save(null, { method: 'insert' });
    expect(connection.toJSON().id).toBeDefined();
    expect(connection.toJSON().status).toBe('matched');
    expect(connection.toJSON().matched_by).toBe(adminUser);
    await connection.accounts().attach([user1, user2]);
    connection_id = connection.toJSON().id; // save the uuid of the connection just made
  });

  it('should update the connection status to "scheduled"', async () => {
    const connection = await new Connections({ id: connection_id }).save({ status: 'scheduled' }, { patch: true });
    expect(connection.toJSON().status).toBe('scheduled');
  });

  it('should get all the connections and check that there are only two users per connection', async () => {
    const allConnections = await Connections.fetchAll({ withRelated: 'accounts.profile' });
    expect(allConnections.toJSON()[0].accounts).toHaveLength(2);
  });

  it('should delete a connection and its related info from the DB', async () => {
    const connections = await new Connections({ id: connection_id }).destroy();
    expect(connections.toJSON()).toEqual({}); // should equal an empty object
    const allConnections = await Connections.fetchAll();
    expect(allConnections.toJSON()).toHaveLength(3);
    const usersConnections = await knex.select().from('users_connections');
    expect(usersConnections).toHaveLength(6); // check that the users_connections table is empty
  });
});
