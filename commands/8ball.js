module.exports = {
    name: '8ball',
    description: 'returns yes or no ',
    execute(message,args) {
        const a = Math.floor(Math.random() * (4 - 1)) + 1;

        var search = args.slice(0).join(" "); 

        if (!args.length) {
            return message.channel.send(`What do you want me to say yes or no to??`);
        }
        //console.log(String(message));
        //console.log(String(args));
        //console.log(String(search));

        console.log(a);
        switch(a) {
            case 1:
                message.channel.send('yes');
                message.channel.send('<:linkpepeHype:629847519752617991>');
                break;
            case 2:
                message.channel.send('no');
                message.channel.send('<:PepeHands:625916862060036127>');
                break;
            case 3:
                message.channel.send('Mayhaps');
                message.channel.send('<:bigshrug:774036872326021170>');
                break;

        }
    }

}