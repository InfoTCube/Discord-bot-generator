const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('flip')
        .setDescription('flipping a coin'),
    async execute(interaction) {
        var ans;
        if(Math.random()*2 < 1) ans = 'heads'
        else ans = 'tails' 
        const embed = new MessageEmbed()
            .setTitle('Coinflip Results')
            .setThumbnail('https://i.gifer.com/Fw3P.gif')
            .setColor('#ffd700')
            .setDescription(`**You got ${ans}!**`);
        interaction.reply({ embeds: [embed] });
    }
}