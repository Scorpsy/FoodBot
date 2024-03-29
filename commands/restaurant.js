const fetch = require("node-fetch");
const Discord = require('discord.js');

require('dotenv').config();

module.exports = {
    name: 'restaurant',
    description: 'Search for a restaurant',
    async execute(message,args) {

        let GoogleAPI = process.env.google
        let location = process.env.location
        let price_c = false

        const businessID = args.join('-');

        if (!businessID) {
            return message.reply('Please add a restaurant name').catch(err => console.log(err));
        }

        let url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${businessID}&inputtype=textquery&fields=place_id&key=${GoogleAPI}&locationbias=point:${location}`;
        //console.log(url);
        fetch(url)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {

                    placeID = data.candidates[0].place_id;

                    return  fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${location}&destination=place_id:${placeID}&key=${GoogleAPI}`);

                })
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    loc = data

                    return fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeID}&fields=user_ratings_total,price_level,name,rating,formatted_phone_number,formatted_address,opening_hours,website&key=${GoogleAPI}`);

                })
                .then((response) => {
                    return response.json();
                }).then((data) => {
                    
                    var d = new Date();
                    var n = d.getDay();
                    const result = data.result;

                    const restEmbed = new Discord.MessageEmbed()
                    .addFields(
                        { name: 'Address', value: result.formatted_address},
                        { name: 'Duration', value: loc.routes[0].legs[0].duration.text, inline: true },
                        
                    );
                    if(!(result.formatted_phone_number === undefined)){
                        restEmbed.addField('Phone Number', result.formatted_phone_number, true)
                    }


                    if(result.rating){

                        n_reveiwers = result.user_ratings_total
                        restEmbed.addField("Rating", result.rating + ` (${n_reveiwers})`, true)

                    }
                    if(result.price_level){

                        var dollarSign = result.price_level;
                        var string =""

                        for(var i = 1 ; i <= dollarSign; i++){
                            string += "$"

                        }

                        restEmbed.addField("Price Level", string,true);
                        price_c = true
                        
                    }
                    if(!price_c && !(result.formatted_phone_number === undefined)){
                        restEmbed.addField("Price Level", "$",true);
                    }

                    if(result.opening_hours !== undefined){
                    switch(n){
                        case 0:
                            restEmbed.addField("Today's Hours", result.opening_hours.weekday_text[6],true);
                            restEmbed.addField("Tomorrow's Hours", result.opening_hours.weekday_text[0], true);
                            break;
                        case 1:
                            restEmbed.addField("Today's Hours", result.opening_hours.weekday_text[0],true);
                            restEmbed.addField("Tomorrow's Hours", result.opening_hours.weekday_text[1], true);
                            break;
                        case 2:
                            restEmbed.addField("Today's Hours", result.opening_hours.weekday_text[1],true);
                            restEmbed.addField("Tomorrow's Hours", result.opening_hours.weekday_text[2], true);
                            break;
                        case 3:
                            restEmbed.addField("Today's Hours", result.opening_hours.weekday_text[2],true);
                            restEmbed.addField("Tomorrow's Hours", result.opening_hours.weekday_text[3], true);
                            break;
                        case 4:
                            restEmbed.addField("Today's Hours", result.opening_hours.weekday_text[3],true);
                            restEmbed.addField("Tomorrow's Hours", result.opening_hours.weekday_text[4], true);
                            break;
                        case 5:
                            restEmbed.addField("Today's Hours", result.opening_hours.weekday_text[4],true);
                            restEmbed.addField("Tomorrow's Hours", result.opening_hours.weekday_text[5], true);
                            break;
                        case 6:
                            restEmbed.addField("Today's Hours", result.opening_hours.weekday_text[5],true);
                            restEmbed.addField("Tomorrow's Hours", result.opening_hours.weekday_text[6], true);
                            break;

                    }  

                    if(result.opening_hours.open_now){
                        restEmbed.setColor("#1da06a");
                    }else{
                        restEmbed.setColor("#b82a10");
                    }

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
                    message.reply('Please provide a real location')
                    console.error(err);
                })


    }

}