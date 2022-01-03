const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('lmgtfy')
        .setDescription('Gives you link to lmgtfy')
        .addStringOption((option) => 
            option
                .setName('text')
                .setDescription('Text to search')
                .setRequired(true)
        ),
    async execute(interaction) {
        interaction.reply(`https://lmgtfy.app/?q=${interaction.options.getString('text').replace(/ /g, "+")}`);
    }
}