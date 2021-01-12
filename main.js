const Discord = require('discord.js');
const config = require('./config.json');
const cheerio = require('cheerio');
const request = require('request');
const fs = require('fs');

const client = new Discord.Client();
const prefix = '-';

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('FoodBot is alive!');

});

client.on('message', message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return; 

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'ping'){
        client.commands.get('ping').execute(message, args);
    }
    else if(command === 'gimage'){
        client.commands.get('gimage').execute(message, args);
    }

});

client.login(config.token);