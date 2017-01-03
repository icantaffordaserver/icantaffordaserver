exports.seed = function (knex, Promise) {
    let tableName = 'invites';
    return Promise.join(
        // Deletes ALL existing entries
        knex(tableName).del(),

        // Inserts seed entries
        knex(tableName).insert({
            email: 'alexandermann11@gmail.com',
            first_name: 'Alexander',
            last_name: 'Mann',
            sent_by_user_account_id: '682FDEE0-78D4-42FC-9E56-B865E519912A',
            accepted: false
        }),
        knex(tableName).insert({
            email: 'a.mann@queensu.ca',
            first_name: 'John',
            last_name: 'Doe',
            sent_by_user_account_id: '48244142-7761-4982-A808-4B27E8BD1BD7',
            accepted: false
        }),
        knex(tableName).insert({
            email: 'alexander.mann.11@gmail.com',
            first_name: 'Alexandera',
            last_name: 'Mann',
            sent_by_user_account_id: 'ACB91CC4-BC20-4DA0-ADCC-626A3AEE64FB',
            accepted: false
        })
    );
};
