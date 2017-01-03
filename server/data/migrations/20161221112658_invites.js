exports.up = function (knex, Promise) {
    return Promise.all([
        knex.schema.createTable('invites', function (table) {
            table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary();
            table.uuid('user_account_id');
            table.foreign('user_account_id').references('user_accounts.id');
            table.string('email').unique();
            table.string('first_name', 100);
            table.string('last_name', 100);
            table.string('invite_token');
            table.uuid('sent_by_user_account_id');
            table.foreign('sent_by_user_account_id').references('user_accounts.id');
            table.boolean('accepted').defaultTo(false);
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.timestamp('updated_at').defaultTo(knex.fn.now());
        })
    ]);
};

exports.down = function (knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('invites')
    ])
};
