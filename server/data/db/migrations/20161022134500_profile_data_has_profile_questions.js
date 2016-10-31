// the up function creates the table
exports.up = function (knex, Promise) {
    return knex.schema.createTable('profile_data_has_profile_questions', function (table) {
        table.integer('profile_data_id').unsigned();
        table.foreign('profile_data_id').references('profile_data.id');
        table.integer('profile_questions_id').unsigned();
        table.foreign('profile_questions_id').references('profile_questions.id');
    })
};

// the down function drops the table
exports.down = function (knex, Promise) {
    return knex.schema.dropTable('profile_data_has_profile_questions');
};
