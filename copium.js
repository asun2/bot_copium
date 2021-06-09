const Discord = require('discord.js');
require('dotenv').config();

const client = new Discord.Client();
const fetch = require('node-fetch');
const ytdl = require('ytdl-core');
const starter = process.env.PREFIX;
const bot_token = process.env.CLIENT_TOKEN;

const queue = new Map();



client.on('ready', () => {

  console.log(`Logged in as ${client.user.tag}!`);
  
});


client.on('message', async msg => {
    console.log('message received from: '+ msg.author.username);
    let command = msg.content.toLowerCase().split(" ");
    const author = msg.author;
    const serverQueue = queue.get(msg.guild.id);


    //Inpiring!
    if (msg.channel.name === "any-copers" ) {
        console.log(command)
        if(command[0] === `${starter}inspire`){
            var url = 'https://zenquotes.io/api/random/beb2efdfc8bbecfb32f687be29893ecb95737a6f'
            let settings = {method : "Get"};
            let quote = ""
            ret = fetch(url)
                .then(res => res.json())
                .then(json=> {msg.channel.send(json[0].q);});
                return;
        }

    }
    

    //Some Trolling
    if (command[0] === `${starter}add-emoji`) {
        msg.channel.send("Would you like to add an emoji?").then(message => {
            message.react('👍')
            message.react('👎');
            const filter = (reaction, user) => {
                return ['👍', '👎'].includes(reaction.emoji.name) && user.id === msg.author.id;
            };
            message.awaitReactions(filter, {max: 1, time: 60000, errors: ['time']}).then(collected => {
                const reaction = collected.first();
                if (reaction.emoji.name === '👍') {
                    message.channel.send('Upload a .png file of the emote you want to create');
                    //turns out discord does not allow bots to upload custom emojis to the server, so this will have to change functionally
                }
                else {
                    message.delete();
                }
            })
            .catch(collected => {
                message.reply('you reacted with neither a thumbs up, nor a thumbs down.');
            });
        });
    }

    //Music Bot
    if (msg.channel.name === "music" ) {
        if (command[0] === `${starter}play`){
            execute(msg, serverQueue)
        }
        if (command[0] === `${starter}skip`){
            execute(msg, serverQueue)
        }
        if (command[0] === `${starter}stop`){
            execute(msg, serverQueue)
        }
    }



});


async function execute(message, serverQueue) {
    const args = message.content.split(" ");
    console.log(args);
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel){
        return message.channel.send(
        "You need to be in a voice channel to play music!"
      );
    } 
    const permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
      return message.channel.send(
        "I need the permissions to join and speak in your voice channel!"
      );
    }
    
    const songInfo = await ytdl.getInfo(args[1]);
    const song = {
        title: songInfo.videoDetails.title,
        url: songInfo.videoDetails.video_url,
    };

    if(!serverQueue){
        const queueContruct = {
            textChannel: message.channel,
            voiceChannel: voiceChannel,
            connection: null,
            songs: [],
            volume: 5,
            playing: true
          };
    

        queue.set(message.guild.id, queueContruct);

        queueContruct.songs.push(song);


        try {
            var connection = await voiceChannel.join();
            queueContruct.connection = connection;
            play(message.guild, queueContruct.songs[0]);
        } catch (err) {
            console.log(err);
            queue.delete(message.guild.id);
            return message.channel.send(err);
        }
    } else {
        serverQueue.songs.push(song);
        return message.channel.send(`${song.title} has been added to the queue!`);
    }      
}

function skip(message, serverQueue) {
    if (!message.member.voice.channel)
      return message.channel.send(
        "You have to be in a voice channel to stop the music!"
      );
    if (!serverQueue)
      return message.channel.send("There is no song that I could skip!");
    serverQueue.connection.dispatcher.end();
}
  
function stop(message, serverQueue) {
    if (!message.member.voice.channel)
      return message.channel.send("You have to be in a voice channel to stop the music!");
      
    if (!serverQueue)
      return message.channel.send("There is no song that I could stop!");
      
    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end();
}
  
function play(guild, song) {
    const serverQueue = queue.get(guild.id);
    if (!song) {
      serverQueue.voiceChannel.leave();
      queue.delete(guild.id);
      return;
    }
    const dispatcher = serverQueue.connection
      .play(ytdl(song.url))
      .on("finish", () => {
        serverQueue.songs.shift();
        play(guild, serverQueue.songs[0]);
      })
      .on("error", error => console.error(error));
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
    serverQueue.textChannel.send(`Start playing: **${song.title}**`);
}

//https://zenquotes.io/api/random/beb2efdfc8bbecfb32f687be29893ecb95737a6f

client.login(bot_token);