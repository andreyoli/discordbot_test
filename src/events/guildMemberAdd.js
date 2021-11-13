module.exports = (client, member) => {
  client.channels.cache.get('808736774708133891').send(`salve <@${member.user.id}>`)
}