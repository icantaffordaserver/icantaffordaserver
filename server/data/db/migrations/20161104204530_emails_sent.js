exports.up = function (knex, Promise) {
    return knex.schema.createTable('emails_sent', function (table) {
        table.increments('id').primary();
        table.timestamp('date_time_sent');
        table.string('last_name');
        table.string('first_name');
        table.string('email');
        table.string('template');
    })
};

// the down function drops the table
exports.down = function (knex, Promise) {
    return knex.schema.dropTable('emails_sent');
};
