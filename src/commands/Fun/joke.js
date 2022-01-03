const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js");
const { default: axios } = require("axios");
const { await, wait } = require('signale/types');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('joke')
        .setDescription('Get a joke'),
    async execute(interaction) {
        try {
            const data = await (await axios.get(`https://v2.jokeapi.dev/joke/Any`)).data;
            if(data.type == 'twopart') {
                const embedSet = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('Joke')
                    .setDescription(data.setup)
                    .setFooter('data from jokeapi.dev');
                interaction.reply({ embeds: [embedSet] });
                await wait(1500);
                const embedDel = new MessageEmbed()
                    .setColor('RANDOM')
                    .setDescription(data.delivery)
                    .setFooter('data from jokeapi.dev');
                interaction.followUp({ embeds: [embedDel] });
            } else if(data.type == 'single') {
                const embedSet = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('Joke')
                    .setDescription(data.joke)
                    .setFooter('data from jokeapi.dev');
                interaction.reply({ embeds: [embedSet] });
            }
        } catch(e) {
            interaction.reply({
                content: 'Something went wrong.',
                ephemeral: true,
            });
        }
    }
}