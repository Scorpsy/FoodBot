const squigglyRegex = RegExp(/{(.*?)}/);
const squareRegex = RegExp(/\[[^[]+\]/g);
const moment = require('moment');
const ms = require('ms');
const Discord = require('discord.js');

module.exports = {
    name: 'addorder',
    description: 'create a list for delivery orders',
    async execute(message,args, orders) {

        const format = '[Option 1] [Option 2] [Option 3]';
        const pollParameters = args.join(' ');

        console.log(squigglyRegex.exec(pollParameters));

        const pollsArray = pollParameters.match(squareRegex);

        if (!pollsArray) {
            return message.channel.send('You need to specify orders').catch(err => console.log(err));
        }

        // console.log(pollsArray);
        var arrayLength = pollsArray.length;
        const orderString = pollsArray.map(poll => `${poll.replace(/\[|\]/g, '')}`);

        // var n = new Array();
        // var h = 0;
        // for(var i = 0; i < arrayLength; i+=2){
        //     n[h++] = rngString[i];
        // }

        // h = 0;
        // var o = new Array();
        // for(i = 1; i <= arrayLength; i+=2){
        //     //console.log(rngString[i]);
        //     o[h++]= rngString[i];
        // }

        // for(i = 0; i <= n.length - 1; i++){
        //     helpEmbed.addField(n[i],o[i]);

        // }

        order.addField(orderString[0],orderString[1])

        return order;

    }

}