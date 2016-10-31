// the up function creates the table
exports.up = function (knex, Promise) {
    return knex.schema.createTable('connections', function (table) {
        table.increments('id').primary();
        table.integer('users_id').unsigned();
        table.foreign('users_id').references('users.id');
        table.dateTime('appointment_time');
        table.timestamps();
    })
};

// the down function drops the table
exports.down = function (knex, Promise) {
    return knex.schema.dropTable('connections');
};
