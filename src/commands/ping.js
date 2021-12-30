const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Pong!'),
    async execute(intercation) {
        interaction.reply('Pong! `' + (Math.abs(Date.now() - intercation.createdTimestamp)) + 'ms`');
    }
}