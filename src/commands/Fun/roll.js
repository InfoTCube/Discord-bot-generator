const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('roll')
        .setDescription('Roll a dice between two numbers')
        .addIntegerOption((min) => 
            min
                .setName('min')
                .setDescription('minimum number to generate')
                .setRequired(true))
        .addIntegerOption((max) => 
            max
                .setName('max')
                .setDescription('maximum number to generate')
                .setRequired(true)
        ),
    async execute(interaction) {
        const num = randomInt(interaction.options.getInteger('min'), interaction.options.getInteger('max'));
        interaction.reply(`You rolled **${num}**`);
    }
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
  