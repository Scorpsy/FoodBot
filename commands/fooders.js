const squigglyRegex = RegExp(/{(.*?)}/);
const squareRegex = RegExp(/\[[^[]+\]/g);
const Discord = require('discord.js');

function order(message, args){

    const orderTitle = args.join(' ');

    if (!orderTitle) {
        return message.channel.send('Please add a restaurant name').catch(err => console.log(err));
    }

    var orders = new Discord.MessageEmbed()
            .setColor('#223441');

    orders.setTitle(orderTitle);

    message.channel.send('order for ' + orderTitle + ' created');

    return orders;
}