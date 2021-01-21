const squigglyRegex = RegExp(/{(.*?)}/);
const squareRegex = RegExp(/\[[^[]+\]/g);
const timeRegex = RegExp(/{(\d+(s|m|h|d|w))}/);

module.exports = {
    name: '8ballnames',
    description: 'randomly return names of the user input',
    execute(message,args) {
        const format = '{Description} [Name 1] [Name 2] [Name 3]';

        const optionParameters = args.join(' ');
        const rngTitle = squigglyRegex.test(optionParameters) ? squigglyRegex.exec(optionParameters)[1] : null;
        console.log(squigglyRegex.exec(optionParameters));

        if (!rngTitle) {
            return message.channel.send('Use format: ' + format).catch(err => console.log(err));
        }

        optionParameters.replace(`{${rngTitle}}`, '');
        const rngsArray = optionParameters.match(squareRegex);

        //console.log(rngsArray[0]);
        var arrayLength = rngsArray.length;
        //console.log(rngsArray[0]);
        //console.log(arrayLength);

        const r = Math.floor(Math.random() * (arrayLength));
        //console.log(r);
        const rngString = rngsArray.map(poll => ` ${poll.replace(/\[|\]/g, '')}`);

        //console.log(rngString);

        const embed = {
            color: '#b41467',
            title: rngTitle,
            description: rngString[r], 
        };


        message.channel.send({ embed: embed }).catch(err => console.log(err));

    }

}