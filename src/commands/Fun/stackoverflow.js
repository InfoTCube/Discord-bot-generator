const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stackoverflow')
        .setDescription('Gives you link to stackoverflow')
        .addStringOption((option) => 
            option
                .setName('text')
                .setDescription('Text to search')
                .setRequired(true)
        ),
    async execute(interaction) {
        interaction.reply(`https://stackoverflow.com/search?q=${interaction.options.getString('text').replace(/ /g, "+")}`);
    }
}