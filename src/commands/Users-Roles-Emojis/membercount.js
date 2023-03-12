const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js");
const moment = require('moment');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('membercount')
        .setDescription('Get number of users in server'),
    async execute(interaction) {
        const members = interaction.guild.members.cache;
        const memberCount = members.filter(member => !member.user.bot).size;
        const embed = new MessageEmbed()
            .setDescription(`There are ${memberCount} users!!!`)
            .setColor(`RANDOM`)
        interaction.reply({ embeds: [embed] });
    }
}