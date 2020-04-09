const Discord = require("discord.js");
const client = new Discord.Client({ disableEveryone: true });

const createCaptcha = require('./captcha');
const fs = require('fs').promises;

client.on('guildMemberAdd', async member => {
    if(member.bot) return;

    console.log("1")

    const time = 120; // How many seconds the user has to solve the captcha.
    const logs = member.guild.channels.get("697557759868272841"); // The channel ID of where all logs are sent.
    const role = member.guild.roles.get(""); // The role ID that is given when a user completes the captcha.
    const role2 = member.guild.roles.get(""); // The role ID that is removed when a user completes the captcha.

    console.log("2")

    logs.send(`${member.user.tag} has joined the server and has ${time} seconds to solve the captcha which I sent to their DMs!`);

    console.log("3")

    const captcha = await createCaptcha();
    try {
        const msg = await member.send(`:stopwatch: You have ${time} seconds to solve this captcha:`, {
            files: [{
                attachment: `${__dirname}/captchas/${captcha}.png`,
                name: `${captcha}.png`
            }]
        });
        try {
            const filter = m => {
                if(m.author.bot) return;
                if(m.author.id === member.id && m.content === captcha) return true;
                else {
                    m.channel.send(':x: You entered the captcha incorrectly!');
                    logs.send(`:x: ${member.user.tag} entered their captcha incorrectly!`);
                    return false;
                }
            };
            const response = await msg.channel.awaitMessages(filter, { max: 1, time: `${time}`*1000, errors: ['time']});
            if(response) {
                await msg.channel.send(':white_check_mark: You have successfully verified yourself!');
                logs.send(`:white_check_mark: ${member.user.tag} has successfully completed the captcha and has proven that they are not a robot!`)
                //await member.roles.add(role);
                //await member.roles.remove(role2);
                await fs.unlink(`${__dirname}/captchas/${captcha}.png`)
                    .catch(err => console.log(err));
            }
        }
        catch(err) {
            console.log(err);
            await msg.channel.send(':x: You didn\'t solve the captcha correctly on time! Please rejoin the server and try again!');
            logs.send(`:x: ${member.user.tag} didn't solve the captcha correctly on time! I have kicked them from the server and told them to rejoin and try the captcha again.`)
            await member.kick();
            await fs.unlink(`${__dirname}/captchas/${captcha}.png`)
                    .catch(err => console.log(err));
        }
    }
    catch(err) {
        console.log(err);
    }
});

client.login("NjgwMDAwODY3OTgxOTgzNzgz.Xo50vw.xqSTW8Qi37UTVDl0jT9nUCZb654");