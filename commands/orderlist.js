const moment = require('moment');
const ms = require('ms');
const Discord = require('discord.js');

module.exports = {
    name: 'order list',
    description: 'returns list of orders',
    async execute(message,args, orders) {


        message.channel.send(orders);

    }

}