exports.up = function (knex, Promise) {
    return Promise.all([
        knex.schema.createTable('user_accounts', function (table) {
            table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary();
            table.string('email').unique();
            table.boolean('email_verified').defaultTo(false);
            table.string('email_verified_token');
            table.string('password_hash');
            table.string('passwordResetToken');
            table.dateTime('passwordResetExpires');
            table.string('phone_number', 12).unique();
            table.string('phone_number_verified');
            table.boolean('admin').defaultTo(false);
            table.string('facebook');
            table.string('twitter');
            table.string('google');
            table.string('vk');
            table.timestamps();
        })
    ]);
};

exports.down = function (knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('user_accounts')
    ])
};
