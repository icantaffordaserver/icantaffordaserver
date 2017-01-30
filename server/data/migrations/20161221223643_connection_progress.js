exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('connection_progress', (table) => {
      table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary();
      table.uuid('user_account_id');
      table.foreign('user_account_id').references('user_accounts.id').onUpdate('CASCADE').onDelete('CASCADE');
      table.uuid('connection_id');
      table.foreign('connection_id').references('connections.id').onUpdate('CASCADE').onDelete('CASCADE');
      table.boolean('firestarter_complete');
      table.dateTime('firestarter_complete_date');
      table.boolean('reflection_complete');
      table.dateTime('reflection_complete_date');
      table.boolean('connection_complete');
      table.dateTime('connection_complete_date');
    }),
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('connection_progress'),
  ]);
};
