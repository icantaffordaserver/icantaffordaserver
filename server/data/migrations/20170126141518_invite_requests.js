exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('invite_requests', (table) => {
      table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary();
      table.uuid('invite_id');
      table.foreign('invite_id').references('invites.id').onDelete('CASCADE');
      table.string('email').unique();
      table.string('first_name', 100);
      table.string('last_name', 100);
      table.text('comment');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    }),
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('invite_requests'),
  ]);
};
