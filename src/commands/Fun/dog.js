const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js");
const { default: axios } = require("axios");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dog')
        .setDescription('Get random dog picture'),
    async execute(interaction) {
        const data = await (await axios.get(`https://dog.ceo/api/breeds/image/random`)).data;
        const embed = new MessageEmbed()
            .setColor('FUCHSIA')
            .setTitle("🐶🐶🐶")
            .setImage(data.message)
            .setFooter(`image from dog.ceo`);
        interaction.reply({ embeds: [embed] });
    }
}