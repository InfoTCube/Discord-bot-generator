const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('color')
        .setDescription('Show hex color')
        .addStringOption((option) => 
            option
                .setName('hex')
                .setDescription('hex of color')
                .setRequired(true)
        ),
    async execute(interaction) {
        const hex = interaction.options.getString('hex');
        if(hex.startsWith('#') && !hex.match(/^[0-9A-Fa-f]+$/) && hex.length == 7) {
            const rgb = hexToRgb(hex)
            const embed = new MessageEmbed()
                .setThumbnail(`https://singlecolorimage.com/get/${hex.substring(1, 7)}/200x200.png`)
                .setColor(hex)
                .addFields(
                    { name: 'hex', value: hex},
                    { name: 'rgb', value: rgb != null ? (rgb.r + ',' + rgb.g + ',' + rgb.b).toString() : 'Cannot convert to rgb'},
                );
            interaction.reply({ embeds: [embed] });
        } else {
            interaction.reply({
                content: 'Invalid hex.',
                ephemeral: true,
            });
        }
    }
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
}