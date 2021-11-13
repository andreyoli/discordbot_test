require('dotenv').config();
const Discord = require('discord.js');
const path = require('path');
const Enmap = require('enmap');
const fs = require('fs');

const client = new Discord.Client();
const config = require('./config.json');

client.config = config;

fs.readdir(path.resolve(__dirname, 'events'), (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    const event = require(path.resolve(__dirname, 'events', file));
    const eventName = file.split('.')[0];
    client.on(eventName, event.bind(null, client));
  });
});

client.commands = new Enmap();

fs.readdir(path.resolve(__dirname, 'commands'), (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    if (!file.endsWith('.js')) return;
    const props = require(`./commands/${file}`);
    const commandName = file.split('.')[0];
    console.log(`carregando ${commandName}`);
    client.commands.set(commandName, props);
  });
});

client.login(process.env.DISCORD_TOKEN);
