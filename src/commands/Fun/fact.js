const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js");
const { default: axios } = require("axios");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('fact')
        .setDescription('Get a random fact'),
    async execute(interaction) {
        const data = await (await axios.get(`https://uselessfacts.jsph.pl/random.json?language=en`)).data;
        const embed = new MessageEmbed()
            .setColor('RANDOM')
            .setTitle('Fact')
            .setDescription(data.text)
            .setFooter('data from uselessfacts.jsph.pl');
        interaction.reply({ embeds: [embed] });
    }
}