const {prefix} = require('../config.json');

module.exports = {
    name: 'help',
    description: 'Current Available Commands',
    execute(message,args,Discord) {
        const helpEmbed = new Discord.MessageEmbed()
            .setColor('#eeaaff')
            .setTitle('Commands')
            .setDescription('These are the working commands of this bot\n more will be added')
            .addFields(
                {name: prefix + 'gimage:', value:'Return an image that is requested'},
                {name: prefix + 'restaurant:', value:'Return restaurant details'},
                {name: prefix + 'spolls:', value:'Start a Poll, \n Use format: {Title} [Option 1] [Option 2] [Option 3]'},   
                {name: prefix + 'fooders:', value:'create order for a restaurant,\n Use format: Restaurant'},
                {name: prefix + 'addorder:', value:'add individual order of a person,\n Use format: Order'},
                {name: prefix + 'orderlist:', value:'Return order for a restaurant'},
            )
            //.setImage('https://static.zerochan.net/Mona.(Genshin.Impact).full.3112267.jpg');


            message.channel.send(helpEmbed);
    }

}