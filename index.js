const { Client, Intents } = require('discord.js');
const Discord = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
require('dotenv').config();

const Kahoot = require("kahoot.js-updated-fixed");

client.once('ready', () => {
    console.log('Ready!');
});


let sessions = []
async function floodgame(pin, name) {
    sessions.unshift(new Kahoot());
    let kahootclient = sessions[0]
    try {
        await kahootclient.join(parseInt(pin, 10), name);
        await kahootclient.on("QuestionStart", question => {
            question.answer(Math.floor(Math.random()*4));
        });
    } catch(err) {
        console.log(err)
    }
    
}



client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'ping') {
        await interaction.reply(`🏓Latency is ${Date.now() - interaction.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`); // Return latency by calculating time now minus time since message was sent
    } else if (commandName === 'help') {
        await interaction.reply('no');
    } else if (commandName === 'flood') {
        const pin = interaction.options.getString("pin");
        const name = interaction.options.getString("name");
        let botAmount = interaction.options.getInteger("amount") || 50; // Create variable for bot amount and set default to 50
        if (!pin.length || !pin[0].match(/^[0-9]+$/)) return interaction.reply('You need to provide a valid kahoot pin!'); // Check kahoot pin requirements
        if (botAmount > 500) return interaction.reply('You can only send maximum of 50 bots!') // Handle bot amounts too large
        const embed = new Discord.MessageEmbed()
            .setTitle("Bot status")
            .setAuthor(`Sending bots to ${pin}`, "https://cdn.discordapp.com/avatars/902146418301599774/2006058bf95981db30d94f47e552bbaa.webp?size=128")
            .setColor('#4dff00')
            .setDescription(`Sending ${botAmount} bots to ${pin}`)
            .setFooter("Made by Super02#3763")
            .setTimestamp()
        await interaction.channel.send({ embeds: [embed] })
        await interaction.reply('Sending bots!')
        for(var i=0; i<botAmount;i++){setTimeout(function(i){floodgame(pin, name+(i+1))},i*100, i)}
    }
});


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

client.login(process.env.token);