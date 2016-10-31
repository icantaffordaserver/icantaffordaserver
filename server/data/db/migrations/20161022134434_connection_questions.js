// the up function creates the table
exports.up = function (knex, Promise) {
    return knex.schema.createTable('connection_questions', function (table) {
        table.increments('id').primary();
        table.string('question_text');
        table.enu('question_type', ['pre_connection', 'post_connection', 'connection_review']);
        table.timestamps();
    })
};

// the down function drops the table
exports.down = function (knex, Promise) {
    return knex.schema.dropTable('connection_questions');
};
