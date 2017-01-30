exports.seed = function (knex, Promise) {
  const tableName = 'user_profiles';
  return Promise.join(
        // Deletes ALL existing entries
        knex(tableName).del(),

        // Inserts seed entries
        knex(tableName).insert({
          user_account_id: '48244142-7761-4982-A808-4B27E8BD1BD7',
          first_name: 'Alexander',
          last_name: 'Mann',
          gender: 'male',
          city: 'Oakville',
          state_province: 'Ontario',
          country: 'Canada',
        }),
        knex(tableName).insert({
          user_account_id: '682FDEE0-78D4-42FC-9E56-B865E519912A',
          first_name: 'Blake',
          last_name: 'Fletcher',
          gender: 'male',
          city: 'Vancouver',
          state_province: 'British Columbia',
          country: 'Canada',
        }),
        knex(tableName).insert({
          user_account_id: 'ACB91CC4-BC20-4DA0-ADCC-626A3AEE64FB',
          first_name: 'Daniel',
          last_name: 'Thompson',
          gender: 'male',
          city: 'Kingston',
          state_province: 'Ontario',
          country: 'Canada',
        }),
    );
};
