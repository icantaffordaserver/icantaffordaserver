// the up function creates the table
exports.up = function (knex, Promise) {
    return knex.schema.createTable('profile_data', function (table) {
        table.increments('id').primary();
        table.integer('users_id').unsigned();
        table.foreign('users_id').references('users.id');
        table.string('last_name');
        table.string('first_name');
        table.string('country');
        table.timestamps();
    })
};

// the down function drops the table
exports.down = function (knex, Promise) {
    return knex.schema.dropTable('profile_data');
};
