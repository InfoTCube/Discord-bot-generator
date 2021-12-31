const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('echo')
        .setDescription('Echos your input')
        .addStringOption((option) => 
            option
                .setName('text')
                .setDescription('Text to echo')
                .setRequired(true)
        ),
    async execute(interaction) {
        interaction.reply(interaction.options.getString('text'));
    }
}