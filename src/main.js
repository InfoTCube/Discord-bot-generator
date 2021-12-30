require('dotenv').config();

const { Client, Intents, Collection } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const signale = require('signale');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const fs = require('fs');

const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));
const commands = [];
client.commands = new Collection();

for(const file of commandFiles) {
    const command  = require(`../src/commands/${file}`);
    commands.push(command.data.toJSON());
    client.commands.set(command.data.name, command);
}

client.once('ready', () => {
    client.user.setPresence({
        activities: [{ name: 'activity name', type: 'activity type'}]
    })

    const rest = new REST({
        version: '9'
    }).setToken(process.env.TOKEN);

    (async () => {
        try {
            if(process.env.ENV === 'production') {
                await rest.put(Routes.applicationCommands(client.user.id), {
                    body: commands
                });
                signale.success(`Successfully registered commands globally.`);
            } else {
                await rest.put(Routes.applicationCommands(client.user.id, process.env.GUILD_ID), {
                    body: commands
                });
                signale.success(`Successfully registered commands locally.`);
            }
        } catch(err) {
            if(err) signale.fatal(err);
        }
    })();

    signale.success(`Bot logged in as ${client.user.tag}`);
});

client.on('interactionCreate', async interaction => {
    if(!interaction.isCommand()) return;
    const command = client.commands.get(interaction.commandName);
    if(!command) return

    try {
        await command.execute(interaction);
    } catch(err) {
        if(err) signale.fatal(err);

        await interaction.reply({
            content: 'An error occurred while executing that command.',
            ephemeral: true,
        });
    }
});

client.login(process.env.TOKEN);