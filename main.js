const Discord = require('discord.js');
const config = require('./config.json');
const cheerio = require('cheerio');
const request = require('request');
const fs = require('fs');


const squigglyRegex = RegExp(/{(.*?)}/);
const squareRegex = RegExp(/\[[^[]+\]/g);
const moment = require('moment');
const ms = require('ms');

const client = new Discord.Client();
const prefix = '-';

client.commands = new Discord.Collection();
var orderEmbed;

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
    else if(command === 'fooders' || command === 'fo'){
        orderEmbed = fooders(message, args);
        //message.channel.send(orderEmbed);
    }
    else if(command === 'addorder' || command === 'ad'){
        orderEmbed = addorder(message, args, orderEmbed);
        //message.channel.send(orderEmbed);
    }
    else if(command === 'orderlist' || command === 'ol'){
        if(!orderEmbed){
            message.channel.send('no order placed');
        }else{
            message.channel.send(orderEmbed);
        }
    }
    else{
        message.channel.send('That response is curretly under development');
    }

});

function fooders(message, args){

    const format = '{Title}';
        const pollParameters = args.join(' ');
        const orderTitle = squigglyRegex.test(pollParameters) ? squigglyRegex.exec(pollParameters)[1] : null;
        console.log(squigglyRegex.exec(pollParameters));

        if (!orderTitle) {
            return message.channel.send('Use format: ' + format).catch(err => console.log(err));
        }

        var orders = new Discord.MessageEmbed()
                .setColor('#223441');

        orders.setTitle(orderTitle);

        message.channel.send('order for ' + orderTitle + ' created');
  
        return orders;

}
function addorder(message, args,order){

    const format = '[Option 1] [Option 2] [Option 3]';
        const pollParameters = args.join(' ');

        const pollsArray = pollParameters.match(squareRegex);

        if (!pollsArray) {
            return message.channel.send('You need to specify orders').catch(err => console.log(err));
        }

        var arrayLength = pollsArray.length;
        const orderString = pollsArray.map(poll => `${poll.replace(/\[|\]/g, '')}`);

        order.addField(orderString[0],orderString[1])

        message.channel.send('added ' + orderString[0] + "'s order of " + orderString[1]);

        return order;

}



client.login(config.token);