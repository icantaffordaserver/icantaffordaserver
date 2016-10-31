// the up function creates the table
exports.up = function (knex, Promise) {
    return knex.schema.createTable('profile_answers', function (table) {
        table.increments('id').primary();
        table.integer('users_id').unsigned();
        table.foreign('users_id').references('users.id');
        table.integer('profile_questions_id').unsigned();
        table.foreign('profile_questions_id').references('profile_questions.id');
        table.string('answer_text');
        table.enu('answer_type', ['profile']);
        table.timestamps();
    })
};

// the down function drops the table
exports.down = function (knex, Promise) {
    return knex.schema.dropTable('profile_answers');
};
