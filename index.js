
const Discord = require('discord.js');
const bot = new Discord.Client();
const msg = new Discord.Message();
var nodemailer = require('nodemailer');
var net = require('net');
const say = require('say')

const readline = require('readline');
const packageinfo = require('./package.json');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

var status = ""

const date = new Date();
const months = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];

const stabletime = months[date.getMonth()] + "/" + date.getDate() + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();



bot.on('message', (message) => {
    
    
        if(message.content == "!stable hello") {  
            message.channel.send('Hello ' + message.author + '!'); 
        }
    
        if(message.content == '!stable what can you do') {
            message.channel.send(message.author + ", I was programmed to keep track of the server's well-being. I am able to track messages, as well as help guide users.");
        }
    
        if(message.content == '!stable goodnight') {
            message.channel.send('Goodnight ' + message.author + "!");
        }

//----------Information----------
        if(message.content == "!stable upcomingfeatures") {
            message.channel.send("File System Control | Alternate Language Interpretation");
        }

        if(message.content == "!stable serverinfo") {
            message.channel.send("Nothing to display yet!");
        }

        if(message.content == "!stable origin") {
            message.channel.send("I am based off the 'GIsgarBot', a bot developed by Gavin Isgar for his personal Discord server. He also developed this bot!");
        }

        if(message.content == "!stable commands") {
            message.channel.send("!stable hello ~ Say hello to StableBot!\n!stable goodnight ~ Say goodnight to StableBot!\n!stable what can you do ~ Displays information about StableBot's abilities.\n!stable upcomingfeatures ~ Displays upcoming features planned to be released for StableBot.\n!stable serverinfo ~ Displays information about StableBot's TCP connections.\n!stable origin ~ Learn about StableBot's history!\n!stable delete100 ~ Delete the last 100 messages in a channel.\n!stable lastban ~ Displays last user banned from the server.\n!stable ban ~ Ban user mentioned in command from server.\n!stable status ~ Receive status of bot.\n!stable kick ~ Kick user mentioned in command from server.\n!stable version ~ Retrieve current version of StableBot.");
        }

        if(message.content == "!stable version") {
            message.channel.send("STABLEBOT VERSION: " + packageinfo.version);
        }
        

        
//--------------Deletes-------------
        if(message.content == "!stable delete100") {
            if(message.member.hasPermission(["MANAGE_MESSAGES"], null, 1, 1)) {
                message.channel.bulkDelete(100, false);
            }
            else {
                message.channel.send(message.author + ", you don't have permission to access that command!");
            }

//------------Bans/Kicks------------

        if(message.content == "!stable lastban") {
            if(message.member.hasPermission(["BAN_MEMBERS"], null, 1, 1)) {
                message.guild.fetchBans().then(bans => {
                    if(bans.first() == null) {
                        message.channel.send("No bans in server.");
                    }
                    else {
                        message.channel.send(bans.first().username + ': Last message "' + bans.first().lastMessage + '"');
                    
                    }

                    if(bans == null) {
                        message.channel.send("No bans in server.");
                    }
                
                });
            }
            else {
                message.channel.send(message.author + ", you don't have permission to access that command!");
            }


        }
    
        if(message.content.startsWith("!stable ban ") && message.mentions.members) { 
            if(message.member.hasPermission(["BAN_MEMBERS"], null, 1, 1)) {
                var banmem = message.mentions.members.first();
                message.guild.member(banmem).ban('You have been banned from ' + message.guild.name + ' by StableBot');
                message.channel.send(banmem + " has been banned from the server.");
            }
            else {
                message.channel.send(message.author + ", you don't have permission to access that command!");
            }
            
        }
        if(message.content.startsWith("!stable kick ") && message.mentions.members) { 
            if(message.member.hasPermission(["KICK_MEMBERS"], null, 1, 1)) {
                var kickmem = message.mentions.members.first();
                message.guild.member(kickmem).kick('You have been kicked from ' + message.guild.name + ' by StableBot');
                message.channel.send(kickmem + " has been kicked from the server.");
            }
            else {
                message.channel.send(message.author + ", you don't have permission to access that command!");
            }
        
        }
    
    
    

//------------Reporting------------

        

        if(message.content == "!stable status") {
            message.channel.send("(" + stabletime + ") " + status);
        }
    
    
    }
    


});

// rl.question('', (answer) => {
     
//         status = answer.toString();
    
// });


rl.on('line', (input) => {
    if(input.toString().includes("!stablestatus")) { 
        try {
            var stat = input.slice(14);
            status = stat.toString();
            console.log('\nStableBot status has been updated');
        }
        catch(error){
            console.log(error);
        }
        
    }

    if(input.toString().includes("!stableuptime")) {
        var uptime = bot.uptime;
        console.log(uptime);
    }

    if(input.toString().includes('!stableconnections')) {
        var conns = input.slice(19);
        bot.guilds.forEach(function (stableguilds) {
            console.log(stableguilds.name);

        });
    }

    if(input.toString().includes('!stableclear')) {
        console.clear();
    }

    if(input.toString().includes('!stableversion')) {
        console.log('STABLEBOT VERSION: ' + packageinfo.version);
    }
  });

bot.on('ready', (ready) => {
    console.log('Copyright © Gavin Isgar 2018');
    console.log('STABLEBOT VERSION: ' + packageinfo.version);
    console.log("StableBot is online.");
});

bot.login('BOT_TOKEN');
