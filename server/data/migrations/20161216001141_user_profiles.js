exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('user_profiles', (table) => {
      table.uuid('user_account_id').primary();
      table.foreign('user_account_id').references('user_accounts.id').onDelete('CASCADE');
      table.string('first_name', 100);
      table.string('last_name', 100);
      table.string('gender', 50);
      table.string('city', 100);
      table.string('state_province', 100);
      table.string('country', 100);
      table.json('typeform_profile');
      table.boolean('typeform_profile_complete');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    }),
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('user_profiles'),
  ]);
};
