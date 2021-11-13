exports.run = async (client, message) => {
  console.log(message.channel.id, message.guild.id, message.content);
};
