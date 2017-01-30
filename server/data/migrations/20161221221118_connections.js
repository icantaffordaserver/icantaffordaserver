exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('connections', (table) => {
      table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary();
      table.enu('status', ['matched', 'scheduled', 'completed']);
      table.dateTime('connection_time');
      table.uuid('matched_by');
      table.foreign('matched_by').references('user_accounts.id').onUpdate('CASCADE');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    }),
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('connections'),
  ]);
};
