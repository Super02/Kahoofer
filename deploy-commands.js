const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
require('dotenv').config();


const commands = [
        new SlashCommandBuilder().setName('flood').setDescription('Floods the kahoot!').addStringOption((option) =>
            option.setName("pin").setDescription("Game pin for kahoot game")),
        new SlashCommandBuilder().setName('help').setDescription('Shows the help menu'),
        new SlashCommandBuilder().setName('ping').setDescription('Shows ping information'),
    ]
    .map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(process.env.token);

rest.put(Routes.applicationGuildCommands(process.env.clientId, process.env.guildId), { body: commands })
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);