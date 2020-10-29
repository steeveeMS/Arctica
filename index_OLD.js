/*
AUTHOR: STEVEN SCHIBLI
EMAIL: info@stevenschibli.com
DISCORD: steevee#1337
WEBSITE: stevenschibli.com
COPYRIGHT RESERVED
*/

const Discord = require('discord.js');
var moment = require('moment');
const config = require('./config.json');
const ytdl = require('ytdl-core');
const client = new Discord.Client();

client.once('ready', () => {
    console.log("Logged in as:", client.user.tag, "\nUP & Ready :)");
});

//ERROR HANDLING
client.on('error', console.error);
client.on('warn', console.warn);
client.on('disconnect', () => console.log('Oopsie I just got disconnected. Will attempt reconnect...'));
client.on('reconnecting', () => console.log('Reconnecting...'));

//GREETING FUNCTION
client.on('guildMemberAdd', member => {
  const channel = member.guild.channels.find(ch => ch.id === config.welcomechannel);
  if (!channel) return;
  channel.send(`(づ￣ ³￣)づ Welcome to the server ${member}`);
});

//CHAT LOGGING FUNCTION
client.on('message', message => {
    if (message.author.bot == true) return;
    client.channels.get(config.textlog).send(`**${message.author.tag}:** ${message.content} | *sent in* ${message.channel} at ${moment().format()}`)
    
})

//PING COMMAND
client.on('message', message => {
    if (message.content === config.prefix + 'ping') {
const embed = new Discord.RichEmbed()

  .setAuthor (message.author.username, message.author.avatarURL)

  .setColor(0x00AE86)

  .setFooter("Bot by steevee#1337", config.botpp)

  .setTimestamp()

  .addField("Ping to websocket:",
           client.ping)

  message.channel.send({embed});
    }
})

/*VOICECHANNELSWITCH LOGGING FUNCTION -> WORK IN PROGRESS
client.on('voiceStateUpdate', (oldMember, newMember => {
    let newUserChannel = newMember.voiceChannel
    let oldUserChannel = oldMember.voiceChannel
    
    if(oldUserChannel === undefinded && newUserChannel !== undefined) {
        
        client.channels.get(config.voicelog).send("ay+") 
        
    } else if(newUserChannel === undefined){
       
        client.channels.get(config.voicelog).send("ay-")
        
    }
    
}))

*/

//USERINFO COMMAND

client.on('message', message => {
	if (message.content === config.prefix + 'userinfo') {
const embed = new Discord.RichEmbed()

  .setAuthor(message.author.username, message.author.avatarURL)

  .setColor(0x00AE86)

  .setFooter("Bot by steevee#1337", config.botpp)

  .setTimestamp()

  .addField("Full Username:",
    message.author.tag)

  .addField("UserID:",
    message.author.id)
            
  .addField("Account was created on:",
    message.author.createdAt)

  .addField("Is the Account a Bot?:",
    message.author.bot)

  .addField("Last message sent:",
    message.author.lastMessage)

  .addField("User Avatar URL:",
    message.author.avatarURL)

 
  message.channel.send({embed});
    
    }
});

//SERVERINFO COMMAND
client.on('message', message => {
    if (message.content === config.prefix + 'serverinfo') {
const embed = new Discord.RichEmbed()

  .setAuthor(message.author.username, message.author.avatarURL)

  .setColor(0x00AE86)

  .setTimestamp()

.addField("Server Name:",
    message.guild.name)

.addField("Created on:",
    message.guild.createdAt)

.addField("Members:",
    message.guild.memberCount)

.addField("Owner:",
    message.guild.owner)

.addField("Server Icon URL:",
    message.guild.iconURL)

.setFooter("Bot by steevee#1337", config.botpp)

message.channel.send({embed});
        
    }
})

/*GAME DETECTION FUNCTION
client.on('presenceUpdate', (oldMember, newMember) => {
    
    console.log(newMember.presence.game);   
    if (newMember.presence.game === '1337'){
    
    client.channels.get('416587394989686824').send(newMember.presence.game)
    
    }
})
*/

//DM FUNCTION TEST
client.on('message', message => {
    if (message.content === config.prefix + 'dm') {
const embed = new Discord.RichEmbed()
  
  .setAuthor(message.author.username, message.author.avatarURL)
        
  .setColor(0x00AE86)
  
  .setFooter("Bot by steevee#1337", config.botpp)
        
  .setTimestamp()

  .addField("Test:",
           message.author.discriminator)
  
           message.channel.send(`${message.author}, DM has been sent! uwu`);
           message.author.send({embed});
        
    }
})

//GAME RECOMMENDATION
client.on('message', message => {
    if (message.content === config.prefix + 'recommendation') {
    var rec = ['CS:GO', 'League of Legends', 'Dead by Daylight', '100% Orange Juice', 'Stick Fight: The Game', 'Fortnite', 'osu!', 'PUBG', 'Rainbow 6 Siege', 'Overwatch', 'Black Ops 4'];

const embed = new Discord.RichEmbed()
  .setAuthor(message.author.username, message.author.avatarURL)
        
  .setColor(0x00AE86)
  
  .setFooter("Bot by steevee#1337", config.botpp)
        
  .setTimestamp()

  .addField("Result:",
            (rec[Math.floor(Math.random() * rec.length)]))

        message.channel.send({embed});
            
    }
})

/*ATTACHMENT TEST
client.on('message', message => {
    if (message.content === config.prefix + 'ayy' && message.channel.id === '418107966835654658') {
        const attachement = MessageAttachment.url === 'https://lh6.googleusercontent.com/-NcqM_27RtQM/AAAAAAAAAAI/AAAAAAAABnI/aEr7QEEh2n0/photo.jpg?sz=32'
        message.channel.send(attachment);
    }
})
*/

//VOICECHANNEL JOIN
client.on('message', message => {
    if (message.content === config.prefix + 'connect') {
        const channel = message.member.voiceChannel;
        
        channel.join()
        .then(connection => message.channel.send('Connected!'))
        .catch(console.error);
    }
})

//VOICECHANNEL DISCONNECT
client.on('message', message => {
    if (message.content === config.prefix + 'disconnect') {
        const channel = message.member.voiceChannel;
        channel.leave();
        message.channel.send("Disconnected!")
    }
})

//PLAY OPUS STREAM / DOESNT WORK CURRENTLY!
client.on('message', message => {
    if (message.content.startsWith (config.prefix + 'opus')) {
        const channel = message.member.voiceChannel;
        channel.join()
        .then(connection => {
        connection.playOpusStream(message.content)    
        });
        
        
    }
})

//PLAY YTDL STREAM
client.on('message', message => {
    if (message.content.startsWith (config.prefix + 'ytdl')) {
        const voiceChannel = message.member.voiceChannel;
        const streamOptions = { seek: 0, volume: 1 };
        voiceChannel.join()
        .then(connection => {
        const stream = ytdl('https://www.youtube.com/watch?v=XAWgeLF9EVQ', { filter : 'audioonly' });
        const dispatcher = connection.playStream(stream, streamOptions);
        message.channel.send("Successful")
        })
    }
})

//SONOS FUNCTION
const { Sonos } = require('sonos')
const { DeviceDiscovery } = require('sonos')
const device = new Sonos(config.sonosdevice);

//JOIN VOICECHANNEL
client.on('message', message => {
    if (message.content === config.prefix + 'sjoin') {
        const channel = message.member.voiceChannel;
        
        channel.join()
        .then(connection => message.channel.send('Connected!'))
        .catch(console.error);
    }
})

//DISCONNECT FROM VOICECHANNEL
client.on('message', message => {
    if (message.content === config.prefix + 'sdisconnect') {
        const channel = message.member.voiceChannel;
        channel.leave();
        message.channel.send("Disconnected!")
    }
})

//PLAY URI TRACK / RESUME PLAYBACK
client.on('message', message => {
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (command === 'splay') {

        let uri = args[0];
    
        device.play(uri)
          .then(() => message.channel.send(`Playing: ${uri}`))
          .catch(message.channel.send("Invalid URI provided."));
        }
})

//PAUSE PLAYBACK
client.on('message', message => {
    if (message.content === config.prefix + 'spause') {
        device.pause()
          .then(() => message.channel.send("Sonos playback paused."))
    }
})

//STOP PLAYBACK
client.on('message', message => {
    if (message.content === config.prefix + 'sstop') {
        device.stop()
          .then(() => message.channel.send("Sonos playback has been stopped."))
    }
})

//SKIP TRACK
client.on('message', message => {
    if (message.content === config.prefix + 'sskip') {
        device.next()
          .then(() => message.channel.send("Track has been skipped."))
    }
})

//PREVIOUS TRACK
client.on('message', message => {
    if (message.content === config.prefix + 'sprevious') {
        device.previous()
          .then(() => message.channel.send("Playing previous track."))
    }
})

//CHECK SONOS DEVICE VOLUME
client.on('message', message => {
    if (message.content === config.prefix + 'svolume') {
        device.getVolume()
          .then((volume) => message.channel.send(`Current Volume = ${volume}`))
        }
})

//SET SONOS DEVICE VOLUME
client.on('message', message => {
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (command === 'ssetvolume') {

        let vol = args[0];
    
        device.setVolume(vol)
          .then(() => message.channel.send(`Volume set to: ${vol}`))
        }
})

//CURRENT TRACK INFO - BROKEN
client.on('message', message => {
    if (message.content === config.prefix + 'snowplaying') {
        device.currentTrack()
          .then((track) => message.channel.send(`Now Playing: ${track}`))
    }
})

//QUEUE INFO - BROKEN
client.on('message', message => {
    if (message.content === config.prefix + 'squeue') {
        message.channel.send(`Here: ${device.getQueue()}`)
    }
})

client.login(config.token);