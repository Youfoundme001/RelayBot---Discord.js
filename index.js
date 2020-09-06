const Discord = require('discord.js');
const client = new Discord.Client();
const { 
    prefix,
    token,
    RequiredRole
} = require('./config.json');

//RequiredRole can be changed to anything ROLE you use on your discord


client.once('ready', () => {
    console.log('RelayBot');
    console.log('Version 1.0.1');
});
client.on('message', message => {
    if(!message.content.startsWith(prefix)) return;
//Next Line Checks to see if member has the correct "Role" assigned.
//If the author has the correct role it will attempt to execute the command
    if(message.member.roles.cache.find(r => r.name === `${RequiredRole}`)) {
        
		//attempt to catch any errors
		try{
        var args = message.content.split(prefix)[1].split(' ');
        const chanid = args[0];
        const msg = args.shift(0);
        const msgstring = args.join(' ');
        client.channels.cache.get(`${chanid}`).send(`${msgstring}`);
        } catch {
                try{
                    var args = message.content.split(' ');
                    const chanid = args[1];
                    const msg = args.splice(0,2);
                    const msgstring = args.join(' ');
                    client.channels.cache.get(`${chanid}`).send(`${msgstring}`);
                } catch {
            console.log("ERROR, " + message.author + " tried to crash the bot");
            message.reply("Follow the rules and quit trying to break me. \n I just saved you the embarassment of breaking me... you're welcome.");
            message.channel.send("Use the correct format <Prefix><ChannelID> <SPACE> Message");
            message.channel.send("Example: EE123412341234 This is the message");
                }
        }
    };
});
client.login(token);
//This bot was created by YouFoundMe#0001
//https://github.com/Youfoundme001/RelayBot---Discord.js.
