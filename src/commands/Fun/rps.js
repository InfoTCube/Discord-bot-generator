const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rps')
        .setDescription('rock paper scissors game')
        .addStringOption((option) =>
            option
                .setName('choice')
                .setDescription('Your choice')
                .setRequired(true)
                .addChoice('rock', 'rock')
                .addChoice('paper', 'paper')
                .addChoice('scissors', 'scissors')
        ),
    async execute(interaction) {
        var bot;
        const random = Math.random()*3;
        if(random < 1) bot = 'rock';
        else if(random < 2) bot = 'paper';
        else bot = 'scissors';
        const user = interaction.options.getString('choice');
        var result = 'It\'s a tie'
        if(user == bot) {
            result = 'It\'s a tie'
        } else if((user == 'rock' && bot == 'scissors') || (user == 'scissors' && bot == 'rock')) {
            result = 'Rock wins!'
        } else if((user == 'rock' && bot == 'paper') || (user == 'paper' && bot == 'rock')) {
            result = 'Paper wins!'
        } else if((user == 'scissors' && bot == 'paper') || (user == 'paper' && bot == 'scissors')) {
            result = 'Scissors wins!'
        }
        const embed = new MessageEmbed()
            .setTitle('Rock paper scissors!')
            .setColor('DARK_GOLD')
            .setDescription(`You chose **${user}** and I chose **${bot}**\n${result}`);
        interaction.reply({ embeds: [embed] });
    }
}