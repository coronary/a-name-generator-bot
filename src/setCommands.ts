import { REST, Routes } from 'discord.js';
import { commands } from './commands';

export const setCommands = async () => {
	const [TOKEN, ID] = [process.env.APP_TOKEN, process.env.APP_ID]
	if(!TOKEN || !ID) {
		return Promise.reject('Environment Variables not properly set');
	}
	const rest = new REST({ version: '10' }).setToken(TOKEN)
	return rest.put(Routes.applicationCommands(ID), { body: commands })
}
