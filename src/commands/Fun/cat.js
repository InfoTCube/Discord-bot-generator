const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('cat')
        .setDescription('Get random cat picture'),
    async execute(interaction) {
        const embed = new MessageEmbed()
            .setColor('FUCHSIA')
            .setTitle('🐱🐱🐱')
            .setImage(`https://cataas.com/cat`)
            .setFooter('image from cataas.com');
        interaction.reply({ embeds: [embed] });
    }
}