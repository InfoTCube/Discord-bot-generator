const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js");
const { await } = require('signale/types');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('uptime')
        .setDescription('Get bot uptime'),
    async execute(interaction) {
        const embed = new MessageEmbed()
            .setTitle('Uptime')
            .setColor('BLURPLE')
            .setDescription(`Bot went online <t:${Math.round(Date.now() / 1000)}:R>`)
            .setFooter(`PID ${process.pid}`);
        interaction.reply({ embeds: [embed] });
    }
}