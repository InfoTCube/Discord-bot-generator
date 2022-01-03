const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js");
const { default: axios } = require("axios");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('gif')
        .setDescription('Search for gif')
        .addStringOption((option) => 
            option
                .setName('text')
                .setDescription('text to search for gif')
                .setRequired(true)
        ),
    async execute(interaction) {
        try {
            const parameter = interaction.options.getString('text');
            const data = await (await axios.get(`https://g.tenor.com/v1/search?q=${parameter}&key=306WJ41RKDF7&limit=1`)).data;
            interaction.reply(data.results[0].itemurl);
        } catch(e) {
            interaction.reply({
                content: 'Something went wrong.',
                ephemeral: true,
            });
        }
    }
}