exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('connection_queue', (table) => {
      table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary();
      table.uuid('user_account_id');
      table.foreign('user_account_id').references('user_accounts.id').onDelete('CASCADE');
      table.text('comment');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    }),
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('connection_queue'),
  ]);
};
