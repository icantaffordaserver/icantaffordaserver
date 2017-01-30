exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users_connections', (table) => {
      table.uuid('user_account_id');
      table.foreign('user_account_id').references('user_accounts.id').onUpdate('CASCADE');
      table.uuid('connection_id');
      table.foreign('connection_id').references('connections.id').onUpdate('CASCADE').onDelete('CASCADE');
    }),
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users_connections'),
  ]);
};
