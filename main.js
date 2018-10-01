// COPYRIGHT (C) GAVIN ISGAR 2018

const Discord = require("discord.js");
const bot = new Discord.Client();
const tokens = require("./exclude/tokens.json");
var fs = require("fs");

// -----SERVER DATA-----
var dan7ehdata = require("./exclude/serverdata/dan7eh/main.json");
var stableprogrammingdata = require("./exclude/serverdata/stableprogramming/main.json");

bot.on("message", (message) => {
    bot.guilds.forEach(function (getGuildID) {
        switch (getGuildID.id.toString()) {
            default: {
                
            }
            // -----DAN7EH SERVER (CLOSE)-----
            case "338579629201817601": {
                // -----TAXI SYSTEM-----

                // -----SCAMMER REPORT SYSTEM-----
                if (message.content.toString().startsWith("/dan reportscammer ")) {
                    var result = message.content.toString().split(" | ");
                    // Gather Report-Data
                    const username = result[0];
                    const platform = result[1];
                    const description = result[2];
                    const issuedate = result[3];
                    const proofurl = result[4];

                    // Transfer the data to the report-channel through a RichEmbed
                    var reportchannel = "493164793541427201";
                    const embed = new Discord.RichEmbed()
                        .setTitle("Scammer Report")
                        .setDescription(`Scammer Report submitted by ${message.author.username}`)
                        .addField("Scammer Name", `${username}`)
                        .addField("Platform", `${platform}`)
                        .addField("Description", `${description}`)
                        .addField("Occurrence Date", `${issuedate}`)
                        .addField("Proof URL", `${proofurl}`);
                    bot.channels.get(reportchannel).send(embed);
                }
                break;
            }
            // -----STABLEPROGRAMMING SERVER (CLOSE)-----
            case "485325667832037396": {
                if (message.content.startsWith("/dan reportscammer ")) {
                    message.content.slice(19);
                    var result = message.content.toString().split(" | ");
                    // Gather Report-Data
                    const username = result[0].replace("/dan reportscammer", "");
                    const platform = result[1];
                    const description = result[2];
                    const issuedate = result[3];
                    const proofurl = result[4];

                    // Create a Report-ID and record it
                    var rand = Math.random().toString().slice(2,11);
                    fs.appendFileSync("./exclude/serverdata/dan7eh/reportids.stable", `${rand}: Author[${message.author}], Scammer[${username}], Platform[${platform}], Description[${description}], Issue-Date[${issuedate}], Proof-URL[${proofurl}]\r\n`);
                    
                    // Transfer the data to the report-channel and create RichEmbed
                    var reportchannel = "493164793541427201";
                    const embed = new Discord.RichEmbed()
                        .setTitle("Scammer Report")
                        .setDescription(`Scammer Report submitted by ***${message.author.username + "#" + message.author.discriminator}***`)
                        .setColor(0xffffff)
                        .setFooter("Copyright (c) Gavin Isgar 2018")
                        .setThumbnail(bot.user.avatarURL)
                        .addField("Scammer Name", `${username}`)
                        .addField("Platform", `${platform}`)
                        .addField("Description", `${description}`)
                        .addField("Occurrence Date", `${issuedate}`)
                        .addField("Proof URL", `${proofurl}`);
                    bot.channels.get(reportchannel).send(embed);
                }
                break;
            }
        }
    })
})

bot.on("guildMemberAdd", (member) => {
    bot.guilds.forEach(function (getGuildID) {
        switch (getGuildID.id.toString()) {
            case "338579629201817601": {
                var welcomechannel = "382554636000690176";
                bot.channels.get(welcomechannel).send(`Welcome to the **D7 Army** ${member}!`);
            }
        }
    })
})

bot.login(tokens.discord);