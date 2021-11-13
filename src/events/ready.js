module.exports = async (client) => {
  const Parser = require('rss-parser');
  const parser = new Parser();
  const database = require('../database/connection');

  console.log(`Bot iniciado com ${client.users.size} usuários, em ${client.channels.size} canais de ${client.guilds.size} servidores.`);

  function animeFeed(anime) {
    const embed = {
      title: anime.categories[0],
      url: anime.link,
    };
    return embed;
  }

  setInterval(async () => {
    // Fetch rss
    const feed = await parser.parseURL('https://goyabu.com/feed/');
    const item = feed.items[0];

    // Filter episode
    const regexEpisode = /(?<=Episódio\s*)(\d+)/gm;
    const animeTitle = item.title;
    const animeFeedEpisode = animeTitle.match(regexEpisode);

    // Search anime in database
    const query = await database.select().from('animes');
    const results = await query;
    const anime = results[0];
    const trx = await database.transaction();
    const animeInDatabase = await trx('animes').where('name', item.categories).del();

    // if the anime is not in database
    if (!animeInDatabase) {
      try {
        await trx('animes').insert({
          name: item.categories,
          episode: Number(animeFeedEpisode[0]),
        });
        await trx.commit();
        const embed = {
          title: item.categories[0],
          url: item.link,
        };
        client.channels.cache.get('808736774708133891').send({ embed });
      } catch (e) {
        console.log(e);
        await trx.rollback();
      }
    }
    // Anime is already in the database but outdated
    else if (anime.name === item.categories && anime.episode < Number(animeFeedEpisode[0])) {
      try {
        await trx('animes').where('name', item.categories).update('episode', Number(animeFeedEpisode[0]));
        await trx.commit();
        const embed = {
          title: item.categories[0],
          url: item.link,
        };
        client.channels.cache.get('808736774708133891').send({ embed });
      } catch (e) {
        console.log(e);
      }
    } else {
      await trx.rollback();
    }

    // acabar aqui
  }, 6000);
};
