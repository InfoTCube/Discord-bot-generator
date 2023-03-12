const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js");
const { default: axios } = require("axios");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('cat')
        .setDescription('Get random cat picture'),
    async execute(interaction) {
        const data = await (await axios.get(`https://some-random-api.ml/animal/cat`)).data;
        const embed = new MessageEmbed()
            .setColor('FUCHSIA')
            .setTitle('🐱🐱🐱')
            .setImage(data.image)
            .setFooter('image from some-random-api.ml');
        interaction.reply({ embeds: [embed] });
    }
}