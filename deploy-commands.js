require('dotenv').config();

const fs = require('node:fs');
const path = require('node:path');

const { REST, Routes } = require('discord.js');

const commands = [];

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	// Looping through the specific commands in each folder
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			commands.push(command.data.toJSON())
		} else {
			console.log(`[WARNING] The command at ${filePath} does not have data or execute properties.`)
		}
	}
}

const rest = new REST().setToken(process.env.BOT_TOKEN);

(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands`);

		const data = await rest.put(
			Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
			{ body: commands }
		)

		console.log(`Successfully reloaded ${data.length} application (/) commands`);
	} catch (error) {
		console.error(error);
	}
})();