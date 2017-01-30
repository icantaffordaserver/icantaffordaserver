exports.seed = function (knex, Promise) {
  const tableName = 'users_connections';

  return Promise.join(
        // Deletes ALL existing entries
        knex(tableName).del(),

        // Inserts seed entries
        knex(tableName).insert({
          user_account_id: '48244142-7761-4982-A808-4B27E8BD1BD7',
          connection_id: 'bc6780ca-6c35-41d9-b208-ca1a1822cd5a',
        }),
        knex(tableName).insert({
          user_account_id: '682FDEE0-78D4-42FC-9E56-B865E519912A',
          connection_id: 'a5c4d713-0ef1-4b81-8017-b2ed37710b1f',
        }),
        knex(tableName).insert({
          user_account_id: 'ACB91CC4-BC20-4DA0-ADCC-626A3AEE64FB',
          connection_id: '905f8de2-afc0-4f80-9abc-60ffc95a1850',
        }),
        knex(tableName).insert({
          user_account_id: 'ACB91CC4-BC20-4DA0-ADCC-626A3AEE64FB',
          connection_id: 'bc6780ca-6c35-41d9-b208-ca1a1822cd5a',
        }),
        knex(tableName).insert({
          user_account_id: '48244142-7761-4982-A808-4B27E8BD1BD7',
          connection_id: 'a5c4d713-0ef1-4b81-8017-b2ed37710b1f',
        }),
        knex(tableName).insert({
          user_account_id: '682FDEE0-78D4-42FC-9E56-B865E519912A',
          connection_id: '905f8de2-afc0-4f80-9abc-60ffc95a1850',
        }),
    );
};
