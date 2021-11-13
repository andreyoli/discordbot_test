module.exports = async (client, guild) => {
  const database = require('../database/connection');
  const trx = await database.transaction();
  try {
    const serverExists = await database.select().from('guilds').where('guild_id', guild.id);
    if (serverExists) {
      await trx('guilds').where('guild_id', guild.id).del();
      await trx.commit();
    }
  } catch (e) {
    console.log(e);
    await trx.rollback();
  }
};
