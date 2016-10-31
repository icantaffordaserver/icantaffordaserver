// the up function creates the table
exports.up = function (knex, Promise) {
    return knex.schema.createTable('profile_data_has_connections', function (table) {
        table.integer('profile_data_id').unsigned();
        table.foreign('profile_data_id').references('profile_data.id');
        table.integer('connections_id').unsigned();
        table.foreign('connections_id').references('connections.id');
    })
};

// the down function drops the table
exports.down = function (knex, Promise) {
    return knex.schema.dropTable('profile_data_has_connections');
};
