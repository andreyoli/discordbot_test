require('dotenv').config();
const Discord = require('discord.js');

const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  console.log(client.guilds);
});

client.on('message', (msg) => {
  if (msg.content === 'ping') {
    msg.reply('pong');
    console.log(msg.channel.id);
  }
});

client.login(process.env.DISCORD_TOKEN);
