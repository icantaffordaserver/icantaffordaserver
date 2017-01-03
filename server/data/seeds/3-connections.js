exports.seed = function (knex, Promise) {
    let tableName = 'connections';
    return Promise.join(
        // Deletes ALL existing entries
        knex(tableName).del(),

        // Inserts seed entries
        knex(tableName).insert({
            id: 'bc6780ca-6c35-41d9-b208-ca1a1822cd5a',
            status: 'matched',
            matched_by: '48244142-7761-4982-A808-4B27E8BD1BD7' // Alexander
        }),
        knex(tableName).insert({
            id: 'a5c4d713-0ef1-4b81-8017-b2ed37710b1f',
            status: 'scheduled',
            connection_time: '2017-01-03T14:38:04+00:00',
            matched_by: '682FDEE0-78D4-42FC-9E56-B865E519912A' // Blake
        }),
        knex(tableName).insert({
            id: '905f8de2-afc0-4f80-9abc-60ffc95a1850',
            status: 'completed',
            connection_time: '2017-01-03T14:39:07+00:00',
            matched_by: 'ACB91CC4-BC20-4DA0-ADCC-626A3AEE64FB' // Dan
        })
    );
};
