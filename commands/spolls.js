const emojiArray = require('../util/optionArray');
const pollModel = require('../models/poll');
const squigglyRegex = RegExp(/{(.*?)}/);
const squareRegex = RegExp(/\[[^[]+\]/g);
const timeRegex = RegExp(/{(\d+(s|m|h|d|w))}/);
const moment = require('moment');
const ms = require('ms');


module.exports = {
    name: 'spolls',
    description: 'creating polls',
    async execute(message,args) {

        const pollParameters = args.join(' ');
        const pollTitle = squigglyRegex.test(pollParameters) ? squigglyRegex.exec(pollParameters)[1] : null;
        console.log(squigglyRegex.exec(pollParameters));

        // console.log(pollParameters);
        // console.log(pollTitle);

        if (!pollTitle) {
            return message.channel.send('You need to specify a poll title').catch(err => console.log(err));
        }

        pollParameters.replace(`{${pollTitle}}`, '');
        const pollsArray = pollParameters.match(squareRegex);

        if (!pollsArray) {
            return message.channel.send('You need to specify poll options').catch(err => console.log(err));
        }

        // console.log(pollsArray);

        let i = 0;
        const pollString = pollsArray.map(poll => `${emojiArray()[i++]} ${poll.replace(/\[|\]/g, '')}`).join('\n\n');
        const timedPoll = timeRegex.test(args[1]) ? timeRegex.exec(args[1])[1] : null;

        const embed = {
            color: '#c5f776',
            title: pollTitle,
            description: pollString,
            footer: {
                text: timedPoll ? `Ends at: ${moment(Date.now() + ms(timedPoll)).format('LLLL')}` : '',
            },
        };

        const msg = await message.channel.send({ embed: embed }).catch(err => console.log(err));
        for (i = 0; i < pollsArray.length; i++) {
            await msg.react(emojiArray()[i]).catch(err => console.log(err));
        }

    }

}