exports.up = (knex) => knex.schema.createTable('guilds_channels', (table) => {
  table.increments('id').primary();
  table.integer('channel_id').unsigned();
  table.integer('guild_id').unsigned();

  table.foreign('channel_id').references('id').inTable('channels');
  table.foreign('guild_id').references('id').inTable('guilds');
});

exports.down = (knex) => knex.schema.dropTable('guilds_channels');
