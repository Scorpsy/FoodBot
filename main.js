const Discord = require('discord.js');
const fs = require('fs');

require('dotenv').config();

const squigglyRegex = RegExp(/{(.*?)}/);
const squareRegex = RegExp(/\[[^[]+\]/g);

const prefix = process.env.prefix;


const client = new Discord.Client();
client.commands = new Discord.Collection();
var orderEmbed;

let yelpAPI = require('yelp-api');

let GoogleAPI = process.env.google;


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


    if(command === 'restaurant' || command === 'r'){
        client.commands.get('restaurant').execute(message, args, GoogleAPI);
    }
    else if(command === '8names' || command === '8n'){
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
    }
    
    else if(command === 'addorder' || command === 'add'){
        if(!orderEmbed){
            message.reply('please specify an order');
        }else{
            orderEmbed = addorder(message, args, orderEmbed);
        }
    }
    else if(command === 'orderlist' || command === 'ol'){
        if(!orderEmbed){
            message.reply('no order created');
        }else{
            message.channel.send(orderEmbed);
        }
    }else if(command === 'clearorder' || command === 'co'){
        if(!orderEmbed){
            message.reply('no order placed');
        }else{
            console.log('all order cleared')
            message.reply('All order cleared')
            orderEmbed = new Discord.MessageEmbed();
        }
    }
    else{
        message.channel.send('That response is offline');
    }

});

function fooders(message, args){

        const orderTitle = args.join(' ');

        if (!orderTitle) {
            return message.reply('Please add a restaurant name').catch(err => console.log(err));
        }

        var orders = new Discord.MessageEmbed()
                .setColor('#223441');

        orders.setTitle(orderTitle);
        console.log('order created');

        message.channel.send('order for ' + orderTitle + ' created');
  
        return orders;


}
function addorder(message, args,order){

        const orderStuff = args.join(' ');

        var author = message.author.username;

        if (!orderStuff) {
            return message.reply('Please add an order').catch(err => console.log(err));
        }

        order.addField(author,orderStuff)
        console.log('food order added');

        //message.channel.send('added ' + author + "'s order of " + orderStuff);
        message.reply('your order of ' + orderStuff + ' has been added');

        return order;

}

client.login(process.env.token);