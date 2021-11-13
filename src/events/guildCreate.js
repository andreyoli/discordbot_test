module.exports = async (client, guild) => {
  const database = require('../database/connection');
  const trx = await database.transaction();

  try {
    await trx('guilds').insert({
      guild_id: guild.id,
    });
    await trx.commit();
  } catch (e) {
    console.log(e);
    await trx.rollback();
  }
};
