const { Client, Intents } = require('discord.js');
const Discord = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

const prefix = "!"

client.once('ready', () => {
    console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;
    const message = interaction.options.getString("pin");
    console.log(message)
    const args = message.slice(prefix.length).trim().split(/ +/g);

    if (commandName === 'ping') {
        await interaction.reply(`🏓Latency is ${Date.now() - interaction.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`); // Return latency by calculating time now minus time since message was sent
    } else if (commandName === 'help') {
        await interaction.reply('no');
    } else if (commandName === 'flood') {
        let pin = args[0]; // Create variable for pin
        let botAmount = args[1] || 50; // Create variable for bot amount and set default to 50
        if (!args.length || !args[0].match(/^[0-9]+$/)) return interaction.reply('You need to provide a valid kahoot pin!'); // Check kahoot pin requirements
        if (botAmount > 500) return interaction.reply('You can only send maximum of 500 bots!') // Handle bot amounts too large
        const embed = new Discord.MessageEmbed()
            .setTitle("Bot status")
            .setAuthor(`Sending bots to ${pin}`, "https://cdn.discordapp.com/avatars/902146418301599774/2006058bf95981db30d94f47e552bbaa.webp?size=128")
            .setColor('#4dff00')
            .setDescription(`Sending ${botAmount} bots to ${pin}`)
            .setFooter("Made by Super02#3763")
            .setTimestamp()
        await interaction.channel.send({ embeds: [embed] })
        interaction.reply('Success!')
    }
});

client.login(process.env.token);