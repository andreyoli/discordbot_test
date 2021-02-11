exports.up = (knex) => knex.schema.createTable('guilds', (table) => {
  table.increments('id').primary();
  table.integer('guild_id').notNullable();
});

exports.down = (knex) => knex.schema.dropTable('guilds');
