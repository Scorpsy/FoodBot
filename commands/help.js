module.exports = {
    name: 'help',
    description: 'Current Available Commands',
    execute(message,args,Discord) {
        const helpEmbed = new Discord.MessageEmbed()
            .setColor('#eeaaff')
            .setTitle('Commands')
            .setDescription('This is the Working command of this bot, more will be added')
            .addFields(
                {name:'gimage', value:'Returns an image that is requested'},
                {name:'gmaps', value:'Return the location that is requested'},
                {name:'spolls', value:'Start a Poll'},   
                {name:'8ball', value:'Replies Yes, No, or Mayhaps'}
            )
            .setImage('https://static.zerochan.net/Mona.(Genshin.Impact).full.3112267.jpg');


            message.channel.send(helpEmbed);
    }

}