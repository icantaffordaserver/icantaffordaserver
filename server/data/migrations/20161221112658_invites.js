exports.up = function (knex, Promise) {
    return Promise.all([
        knex.schema.createTable('invites', function (table) {
            table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary();
            table.string('email').unique();
            table.string('first_name', 100);
            table.string('last_name', 100);
            table.string('sent_by', 100); // TODO: this should be a foreign key pointing to admin's id
            table.string('invite_token');
            table.boolean('accepted').defaultTo(false);
            table.timestamps();
        })
    ]);
};

exports.down = function (knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('invites')
    ])
};
