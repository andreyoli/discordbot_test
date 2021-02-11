exports.up = (knex) => knex.schema.createTable('animes', (table) => {
  table.increments('id').primary();
  table.string('name').notNullable();
  table.integer('episode').notNullable();
  table.integer('guild_channels_id').unsigned();

  table.foreign('guild_channels_id').references('id').inTable('guilds_channels');
});

exports.down = (knex) => knex.schema.dropTable('animes');
