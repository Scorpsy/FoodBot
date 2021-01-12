const Discord = require('discord.js');
const config = require('./config.json');

const client = new Discord.Client();
const prefix = '-';

client.once('ready', () => {
    console.log('FoodBot is alive!');

});

client.on('message', message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return; 

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'ping'){
        message.channel.send('pong!');
    }

});

client.login(config.token);