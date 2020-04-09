const Discord = require("discord.js");
const client = new Discord.Client({ disableEveryone: true });

const createCaptcha = require('./captcha');
const fs = require('fs').promises;

const prefix = ""; // The bot's prefix.

const emoji = ""; // The emoji that the user has to press to verify themself.
const verificationChannel = message.guild.channels.get(""); // The verification channel.
const logs = message.guild.channels.get(""); // The logs channel.
const message = ""; // The message which the bot will send in the verification channel.

client.on("message", async message => {
    if(user === bot.user) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if(command === "sendMessage") {
        message.channel.send(message).then(message => {
            message.react(emoji);
        });
    }
});

client.on("messageReactionAdd", (messageReaction, user) => {
    if(user.bot) return;
    const { message, emoji } = messageReaction;
    
    if(emoji.name === emoji) {
        if(message.channel.id === verificationChannel) {
            const roleToAdd = message.guild.roles.get(""); // The role the bot will add to the user when they complete verification.
            const roleToRemove = message.guild.roles.get(""); // The role the bot will remove from the user when they complete verification.

            message.channel.send(":white_check_mark:").then(msg => { msg.delete(3000) });
            user.send(`:white_check_mark: You have successfully verified youself in the server: \`${message.guild.name}\`!`)
            user.addRole(roleToAdd.id);
            user.removeRole(roleToRemove.id);
            logs.send(`${user.tag} has successfully verified themself!`)
        }
    } 
});

client.login("NjgwMDAwODY3OTgxOTgzNzgz.Xo50vw.xqSTW8Qi37UTVDl0jT9nUCZb654");