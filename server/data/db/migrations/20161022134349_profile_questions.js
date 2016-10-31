// the up function creates the table
exports.up = function (knex, Promise) {
    return knex.schema.createTable('profile_questions', function (table) {
        table.increments('id').primary();
        table.string('question_text');
        table.enu('question_type', ['profile']);
        table.timestamps();
    })
};

// the down function drops the table
exports.down = function (knex, Promise) {
    return knex.schema.dropTable('profile_questions');
};
