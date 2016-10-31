// the up function creates the table
exports.up = function (knex, Promise) {
    return knex.schema.createTable('connection_answers', function (table) {
        table.increments('id').primary();
        table.integer('users_id').unsigned();
        table.foreign('users_id').references('users.id');
        table.integer('connection_questions_id').unsigned();
        table.foreign('connection_questions_id').references('connection_questions.id');
        table.integer('connections_id').unsigned();
        table.foreign('connections_id').references('connections.id');
        table.string('answer_text');
        table.enu('answer_type', ['pre_connection', 'post_connection', 'connection_review']);
        table.timestamps();
    })
};

// the down function drops the table
exports.down = function (knex, Promise) {
    return knex.schema.dropTable('connection_answers');
};
