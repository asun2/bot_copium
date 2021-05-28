const Discord = require('discord.js');

// Importing this allows you to access the environment variables of the running node process
require('dotenv').config();

const client = new Discord.Client();
const fetch = require('node-fetch');

const starter = process.env.PREFIX;
const bot_token = process.env.CLIENT_TOKEN;


client.on('ready', () => {

  console.log(`Logged in as ${client.user.tag}!`);
  
});

client.on('message', msg => {
    console.log('message received from: '+ msg.author.username);
    let command = msg.content.toLowerCase().split(" ");
    const author = msg.author;
    if (msg.author.username == 'vsoltan123') {
        
        msg.react('<:sadge:847837277836542002>');
        
    }
    if (msg.channel.name === "any-copers" ) {
        console.log(command)
        if(command[0] === "!inspire"){
            var url = 'https://zenquotes.io/api/random/beb2efdfc8bbecfb32f687be29893ecb95737a6f'
            let settings = {method : "Get"};
            let quote = ""
            ret = fetch(url)
                .then(res => res.json())
                .then(json=> {msg.channel.send(json[0].q);});
            //console.log(ret)
            //msg.channel.send(ret)
        }

    }
    if (command[0] === "!add-emoji") {
        msg.channel.send("Would you like to add an emoji?").then(message => {
            message.react('👍')
            message.react('👎');
            const filter = (reaction, user) => {
                return ['👍', '👎'].includes(reaction.emoji.name) && user.id === msg.author.id;
            };
            message.awaitReactions(filter, {max: 1, time: 6000, errors: ['time']}).then(collected => {
                const reaction = collected.first();
                if (reaction.emoji.name === '👍') {
                    message.channel.send('confirmation received');
                }
                else {
                    message.delete();
                }
            });
        });
    }


    //}
    // if(msg.author.username === "vsoltan123") {
    //     msg.react('😡');
    //     msg.reply("i lov u");
});



//https://zenquotes.io/api/random/beb2efdfc8bbecfb32f687be29893ecb95737a6f

client.login(bot_token);