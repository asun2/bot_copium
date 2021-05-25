const Discord = require('discord.js');

// Importing this allows you to access the environment variables of the running node process
require('dotenv').config();

const client = new Discord.Client();
const fetch = require('node-fetch');

const starter = process.env.PREFIX;
const bot_token = process.env.CLIENT_TOKEN;

console.log(bot_token)

client.on('ready', () => {

  console.log(`Logged in as ${client.user.tag}!`);
  
});

client.on('message', msg => {
    console.log(msg.author.username);
     if (msg.author.username !== 'copium') {
        let command = msg.content.toLowerCase().split(" ");
        const author = msg.author;
        msg.react('😄');
        console.log('message received');

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

    //}
    // if(msg.author.username === "vsoltan123") {
    //     msg.react('😡');
    //     msg.reply("i lov u");
     }
});



//https://zenquotes.io/api/random/beb2efdfc8bbecfb32f687be29893ecb95737a6f

client.login(bot_token);