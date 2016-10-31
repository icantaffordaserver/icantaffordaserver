// the up function creates the table
exports.up = function (knex, Promise) {
    return knex.schema.createTable('users', function (table) {
        table.increments('id').primary();
        table.string('email').unique();
        table.string('username').unique();
        table.string('password');
        table.boolean('email_verified');
        table.string('email_verified_token').unique();
        table.timestamps();
    })
};

// the down function drops the table
exports.down = function (knex, Promise) {
    return knex.schema.dropTable('users');
};
