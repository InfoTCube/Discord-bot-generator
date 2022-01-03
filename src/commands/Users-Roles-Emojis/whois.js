const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js");
const moment= require('moment');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('whois')
        .setDescription('Get info about user')
        .addUserOption(option => 
            option
                .setName('user')
                .setDescription('User you want to know more about')
                .setRequired(true)
        ),
    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const member = interaction.guild.members.cache.get(user.id);
        const roles = member.roles.cache.map(roles => `${roles}`);
        const perms = member.permissions.toArray();
        const embed = new MessageEmbed()
            .setDescription(`<@${user.id}>`)
            .setAuthor(user.tag, user.displayAvatarURL(), user.displayAvatarURL())
            .setThumbnail(user.displayAvatarURL())
            .setColor(member.displayHexColor)
            .addFields(
                { name: 'Joined', value: `${moment.utc(user.joinedAt).format('h:mm:ss - DD/MM/YYYY')}`, inline: true},
                { name: 'Created', value: `${moment.utc(user.createdAt).format('h:mm:ss - DD/MM/YYYY')}`, inline: true},
                { name: 'ID', value: user.id, inline: true},
                { name: `Roles [${roles.length}]`, value: roles.join(', ') },
                { name: `Permissions`, value: perms.join(', ').toLowerCase() },
                );
        interaction.reply({ embeds: [embed] });
    }
}