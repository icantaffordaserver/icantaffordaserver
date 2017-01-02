
exports.seed = function (knex, Promise) {
    const tableName = 'user_accounts';
    return Promise.join(
        // Deletes ALL existing entries
        knex(tableName).del(),

        // Inserts seed entries
        knex(tableName).insert({
            id: '48244142-7761-4982-A808-4B27E8BD1BD7',
            email: 'alexander.mann@me.com',
            email_verified: true,
            password_hash: '$2a$10$9YI/gWn0ROXAEU9lU2wo7e9.t3WjEIKV5bD76AtPBLtKV7RPbgoiq', // hello
            phone_number: '9053995251',
            phone_number_verified: true,
            admin: true
        }),
        knex(tableName).insert({
            id: '682FDEE0-78D4-42FC-9E56-B865E519912A',
            email: 'blake@shiftwith.us',
            email_verified: true,
            password_hash: '$2a$10$9YI/gWn0ROXAEU9lU2wo7e9.t3WjEIKV5bD76AtPBLtKV7RPbgoiq', // hello
            phone_number: '9054650260',
            phone_number_verified: true,
            admin: true
        }),
        knex(tableName).insert({
            id: 'ACB91CC4-BC20-4DA0-ADCC-626A3AEE64FB',
            email: 'daniel@shiftwith.us',
            email_verified: true,
            password_hash: '$2a$10$9YI/gWn0ROXAEU9lU2wo7e9.t3WjEIKV5bD76AtPBLtKV7RPbgoiq', // hello
            phone_number: '9053395260',
            phone_number_verified: true,
            admin: true
        })
    );
};
