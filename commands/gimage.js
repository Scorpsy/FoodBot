module.exports = {
    name: 'gimage',
    description: 'returns an image requested from google',
    execute(message,args) {

        var search = args.slice(0).join(" "); 
        //creates an array from the sliced words

        if (!args.length) {
            return message.channel.send(`Please add an image`);
        }
        var cheerio = require("cheerio");
        var request = require("request");
        const Discord = require('discord.js');

        var options = {
            url: "http://results.dogpile.com/serp?qc=images&q=" + search,
            method: "GET",
            headers: {
                "Accept": "text/html",
                "User-Agent": "Chrome"
            }
        };

        request(options, function(error, response, responseBody) {
            if (error) {
                // handle error
                return;
            }
     
            /* Extract image URLs from responseBody using cheerio */
     
            $ = cheerio.load(responseBody); 
     
            var links = $(".image a.link");

            //console.log('test');

            var urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"));
            console.log(urls);
            if (!urls.length) {
                // Handle no results
                return;
            }
     
            const newEmbed = new Discord.MessageEmbed()
            .setColor('#0011DD')
            .setImage(String(urls[Math.floor(Math.random() * urls.length)]));

            // Send result
            message.channel.send(newEmbed);
        });


    }
}