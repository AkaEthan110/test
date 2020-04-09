const Discord = require("discord.js");
const client = new Discord.Client({ disableEveryone: true });

const createCaptcha = require('./captcha');
const fs = require('fs').promises;

const emojiCheck = "✅"; // The emoji that the user has to press to verify themself.

client.on("message", async message => {
    if(message.content === "-sendMessage") {
        const messageToSend = "Hello! :slight_smile:"; // The message which the bot will send in the verification channel.

        const a = await message.channel.send(messageToSend);
        return a.react(emojiCheck);
    }
});

client.on("messageReactionAdd", (messageReaction, user) => {
    if(user.bot) return;
    const { message, emoji } = messageReaction;

    console.log("1")
    if(emoji.name === emojiCheck) {
        console.log("2")

        const verificationChannel = message.guild.channels.get("697785007137095750"); // The verification channel.

        if(message.channel.id == verificationChannel) {
            console.log(!"3")

            const roleToAdd = message.guild.roles.get("697784771144712283"); // The role the bot will add to the user when they complete verification.
            const roleToRemove = message.guild.roles.get("697784789263974452"); // The role the bot will remove from the user when they complete verification.
            const logs = message.guild.channels.get("697783934653825075"); // The logs channel.

            console.log("3")

            message.channel.send(":white_check_mark:").then(msg => { msg.delete(3000) });
            user.send(`:white_check_mark: You have successfully verified youself in the server: \`${message.guild.name}\`!`)
            user.addRole(roleToAdd.id);
            user.removeRole(roleToRemove.id);
            logs.send(`${user.tag} has successfully verified themself!`)
        }
    } 
});

client.on("ready", async () => {
    console.log("Ready!")
});

client.login("NjgwMDAwODY3OTgxOTgzNzgz.Xo50vw.xqSTW8Qi37UTVDl0jT9nUCZb654");