const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('appresults')
    .setDescription('Tell a user about the status of their application.')
	.addRoleOption(option => option
	 .setName('results')
	 .setDescription('The status of the application.')
	 .setRequired(true))
	.addUserOption(option => option
	 .setName('username')
	 .setDescription('The target user.')
	 .setRequired(true))
	.addStringOption(option => option
	 .setName('notes')
	 .setDescription('Notes.')
	 .setRequired(true)),
    // .setDefaultMemberPermissions(PermissionFlagsBits.Speak),

  async execute(interaction) {
	const resultsChannel = interaction.client.channels.cache.get(process.env.RESULTS_CHANNEL);
	if (!resultsChannel) {
	 return console.error(`Channel with ID ${process.env.RESULTS_CHANNEL} wasn not found`);
	}
	await resultsChannel.send({ content: `${interaction.options.getUser('username')}`})
	const appResultsEmbed = new EmbedBuilder()
	 .setColor(0x2204C)
	 .setTitle("Application Results")
	 .setDescription(` ${interaction.user} has read this application`)
	 .addFields(
	  { name: 'Result', value: `${interaction.options.getRole('results')}`},
	  { name: 'Username', value: `${interaction.options.getUser('username')}`},
	  { name: 'Notes', value: `${interaction.options.getString('notes')}`},
	)
	 resultsChannel.send({ embeds: [appResultsEmbed] });
	 await interaction.reply({ content: 'Embed successfully created and sent!', ephemeral: true });
  },
};
