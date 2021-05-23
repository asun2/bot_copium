const Discord = require('discord.js');
const client = new Discord.Client();
const fetch = require('node-fetch');
const starter = ';';


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  
});

client.on('message', msg => {
    console.log(msg.author.username);
    // if (msg.author.username === 'asun') {
        let command = msg.content.toLowerCase().split(" ");
        const author = msg.author;

        console.log('message received');

        if (msg.channel.name === "any-copers" ) {
            var url = 'https://zenquotes.io/api/random/beb2efdfc8bbecfb32f687be29893ecb95737a6f'
            let settings = {method : "Get"};
            let quote = ""
            ret = fetch(url)
                .then(res => res.json())
                .then(json=> {msg.channel.send(json[0].q);});
            // console.log(ret)
            // msg.channel.send(quote)

        }

    //}
    // if(msg.author.username === "vsoltan123") {
    //     msg.react('😡');
    //     msg.reply("i lov u");
    // }
});



//https://zenquotes.io/api/random/beb2efdfc8bbecfb32f687be29893ecb95737a6f

client.login('ODM4ODMyODk1OTgzMzUzOTE3.YJA2Aw.v-14IAM4vt0rb3qjQJkCde50diA');