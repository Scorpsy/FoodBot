module.exports = {
    name: 'help',
    description: 'Current Available Commands',
    execute(message,args,Discord) {
        const helpEmbed = new Discord.MessageEmbed()
            .setColor('#eeaaff')
            .setTitle('Commands')
            .setDescription('These are the working commands of this bot\n more will be added')
            .addFields(
                {name:'gimage:', value:'Return an image that is requested'},
                {name:'gmaps:', value:'Return the location that is requested'},
                {name:'spolls:', value:'Start a Poll, \n Use format: {Title} [Option 1] [Option 2] [Option 3]'},   
                {name:'8ball:', value:'Replies Yes, No, or Mayhaps'},
                {name:'8names:', value:'Replies with user inputs, \n Use format: {Description} [Name 1] [Name 2] [Name 3]'},
                {name:'fooders:', value:'create order for a restaurant,\n Use format: {Restaurant}'},
                {name:'addorder:', value:'add individual order of a person,\n Use format: [Name] [Order]'},
                {name:'orderlist:', value:'Return order for a restaurant'},
            )
            //.setImage('https://static.zerochan.net/Mona.(Genshin.Impact).full.3112267.jpg');


            message.channel.send(helpEmbed);
    }

}