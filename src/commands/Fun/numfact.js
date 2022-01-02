const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { fetch } = require('cross-fetch');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('numfact')
        .setDescription('Gives random fact about your number')
        .addIntegerOption((option) => 
            option
                .setName('number')
                .setDescription('number you want to know a random fact about')
                .setRequired(true)),
    async execute(interaction) {
        try {
            const num = interaction.options.getInteger('number');
            const fact = await (await fetch(`http://numbersapi.com/${num}`)).text();
            const embed = new MessageEmbed()
                .setTitle(`Random fact about ${num}`)
                .setColor('RANDOM')
                .setDescription(fact);
            interaction.reply({ embeds: [embed] });  
        } catch (e) {
            console.log(e);
            interaction.reply({
                content: 'Something went wrong.',
                ephemeral: true,
            });
        }
    }
}