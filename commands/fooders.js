const squigglyRegex = RegExp(/{(.*?)}/);
const squareRegex = RegExp(/\[[^[]+\]/g);
const moment = require('moment');
const ms = require('ms');
const Discord = require('discord.js');

module.exports = {
    name: 'fooders',
    description: 'create a list for delivery orders',
    async execute(message,args, orders) {

        const format = '{Title} [Option 1] [Option 2] [Option 3]';
        const pollParameters = args.join(' ');
        const orderTitle = squigglyRegex.test(pollParameters) ? squigglyRegex.exec(pollParameters)[1] : null;
        console.log(squigglyRegex.exec(pollParameters));


        if (!orderTitle) {
            return message.channel.send('Use format: ' + format).catch(err => console.log(err));
        }

        orders.setTitle(orderTitle);

        message.channel.send('order for ' + orderTitle + ' created');
        
        return orders;

    }

}