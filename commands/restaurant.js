const fetch = require("node-fetch");
const Discord = require('discord.js');

module.exports = {
    name: 'restaurant',
    description: 'Search for a restaurant',
    async execute(message,args,GoogleAPI) {

        const businessID = args.join('-');

        if (!businessID) {
            return message.reply('Please add a restaurant name').catch(err => console.log(err));
        }

        let url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${businessID}
        &inputtype=textquery&fields=place_id&key=${GoogleAPI}`;

        fetch(url)
                .then((response) => {
                    return response.json();
                })
                .then( (data) => {
                    var placeID = data.candidates[0].place_id;

                    return  fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeID}&fields=name,rating,formatted_phone_number,formatted_address,opening_hours,website,photo&key=${GoogleAPI}`);

                })
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    //console.log(data.result)
                    
                    var d = new Date();
                    var n = d.getDay();
                    const result = data.result;

                    const restEmbed = new Discord.MessageEmbed()
                    .addFields(
                        { name: 'Phone Number', value: result.formatted_phone_number, inline: true },
                        { name: "Ratings", value: result.rating, inline: true },
                    );

                    switch(n){
                        case 0:
                            restEmbed.addField("Today's Hours", result.opening_hours.weekday_text[6]);
                            break;
                        case 1:
                            restEmbed.addField("Today's Hours", result.opening_hours.weekday_text[0]);
                            break;
                        case 2:
                            restEmbed.addField("Today's Hours", result.opening_hours.weekday_text[1]);
                            break;
                        case 3:
                            restEmbed.addField("Today's Hours", result.opening_hours.weekday_text[2]);
                            break;
                        case 4:
                            restEmbed.addField("Today's Hours", result.opening_hours.weekday_text[3]);
                            break;
                        case 5:
                            restEmbed.addField("Today's Hours", result.opening_hours.weekday_text[4]);
                            break;
                        case 6:
                            restEmbed.addField("Today's Hours", result.opening_hours.weekday_text[5]);
                            break;

                    }

                    if(result.opening_hours.open_now){
                        restEmbed.setColor("#1da06a");
                    }else{
                        restEmbed.setColor("#b82a10");
                    }

                    if(result.website){
                        restEmbed.setTitle(result.name)
                        restEmbed.setURL(result.website)
                    }else{
                        restEmbed.setAuthor(result.name)
                    }

                    message.channel.send({ embed: restEmbed });

                })
                .catch((err) => {
                    console.error(err);
                })


    }

}