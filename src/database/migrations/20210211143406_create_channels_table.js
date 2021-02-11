exports.up = (knex) => knex.schema.createTable('channels', (table) => {
  table.increments('id').primary();

  table.integer('channel_id').notNullable();
});

exports.down = (knex) => knex.schema.dropTable('channels');
