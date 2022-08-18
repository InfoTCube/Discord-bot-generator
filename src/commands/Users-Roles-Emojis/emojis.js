const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js");
const moment = require('moment');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('emojis')
        .setDescription('Gets a list of server emojis')
        .addStringOption(option => 
            option
                .setName('search')
                .setDescription('Search for name')
                .setRequired(false)
        ),
    async execute(interaction) {
        await interaction.guild.emojis.fetch();
        const search = interaction.options.getString('search');
        var emojis = interaction.guild.emojis.cache;
        if(search !== null) emojis = emojis.filter(e => e.name.toLowerCase().includes(search.toLowerCase()));
        const emojisList = emojis.map(e => e.toString()).join(' ');
        const embed = new MessageEmbed()
            .setTitle(`${emojis.filter(e => e.animated == false).size} Static, ${emojis.filter(e => e.animated == true).size} Animated (${emojis.size} total)`)
            .setColor('BLURPLE')
            .setDescription(emojisList);
        interaction.reply({ embeds: [embed] });
    }
}