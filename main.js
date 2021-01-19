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

client.on('message', async(message) => {
    
    if(!message.content.startsWith(prefix) || message.author.bot) return; 

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === '8names' || command === '8n'){
        client.commands.get('8ballnames').execute(message, args);
    }
    else if(command === 'gimage'){
        client.commands.get('gimage').execute(message, args);
    }
    else if(command === 'help'){
        client.commands.get('help').execute(message, args, Discord);
    }
    else if(command === '8ball' || command === '8b'){
        client.commands.get('8ball').execute(message, args);
    }
    else if(command === 'spolls'){
        client.commands.get('spolls').execute(message, args);
    }
    else{
        message.channel.send('That response is curretly under development');
    }

});

client.login(config.token);