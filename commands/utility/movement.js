require('dotenv').config()
const { SlashCommandBuilder, EmbedBuilder, Embed } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('movement')
	.setDescription('Promote, Demote, or Retire a user.')

	.addUserOption(option => 
	  option
	    .setName('username')
		.setDescription('The user to apply this movement on.')
		.setRequired(true)  
	)
	.addRoleOption(option => 
	  option
	    .setName('movement')
		.setDescription('Select the type of movement.')
		.setRequired(true)
	)
	.addRoleOption(option =>
	  option
	    .setName('new-role')
		.setDescription('The new role to give to the user.')
		.setRequired(true)
	)
	.addStringOption(option => 
	  option
	    .setName('reason')
		.setDescription('Reason for the movement on this user.')
		.setRequired(true)
	),
	async execute(interaction) {
	  const movementChannel = interaction.client.channels.cache.get(process.env.MOVEMENT_CHANNEL);

	//   const roleToGive = interaction.guild.roles.cache.find(role => role.name === interaction.options.getRole('new-role'));
	//   const userToGiveRoleTo = interaction.guild.members.cache.get(interaction.options.getUser('username'));

	  await movementChannel.send({content: `${interaction.options.getUser('username')}`});

	  const movementEmbed = new EmbedBuilder()
	    .setColor(0xFFFFFF)
		.setTitle('Movement')
		.setDescription(`${interaction.user} has read this application`)
		.addFields(
		  { name: 'User', value: `${interaction.options.getUser('username')}` },
		  { name: 'Movement', value: `${interaction.options.getRole('movement')}` },
		  { name: 'New role', value: `${interaction.options.getRole('new-role')}` },
		  { name: 'Reason', value: `${interaction.options.getString('reason')}` },
		);

		await movementChannel.send({embeds: [movementEmbed]});
		// console.log(interaction.options.getRole('new-role'))
		// console.log(userToGiveRoleTo)
		// userToGiveRoleTo.roles.add(roleToGive);

		await interaction.reply({content: 'Embed successfully created and sent!', ephemeral: true})
	}
}