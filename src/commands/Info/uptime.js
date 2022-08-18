const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js");
const { await } = require('signale/types');

const startDate = Date.now();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('uptime')
        .setDescription('Get bot uptime'),
    async execute(interaction) {
        const pid = await process.pid;
        const embed = new MessageEmbed()
            .setTitle('Uptime')
            .setColor('BLURPLE')
            .setDescription(`Bot went online <t:${Math.round(startDate / 1000)}:R>`)
            .addField('PID', pid.toString(), true);
        interaction.reply({ embeds: [embed] });
    }
}