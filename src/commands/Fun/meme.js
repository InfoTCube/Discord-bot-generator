const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js");
const { default: axios } = require("axios");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('meme')
        .setDescription('Get a random meme'),
    async execute(interaction) {
        const data = await (await axios.get(`https://meme-api.herokuapp.com/gimme`)).data;
        const embed = new MessageEmbed()
            .setColor('NOT_QUITE_BLACK')
            .setTitle("meme")
            .setImage(data.url)
            .setFooter(`meme from Meme API`);
        interaction.reply({ embeds: [embed] });
    }
}