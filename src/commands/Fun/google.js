const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('google')
        .setDescription('Gives you link to googling')
        .addStringOption((option) => 
            option
                .setName('text')
                .setDescription('Text to search')
                .setRequired(true)
        ),
    async execute(interaction) {
        interaction.reply(`https://letmegooglethat.com/?q=${interaction.options.getString('text').replace(/ /g, "+")}`);
    }
}