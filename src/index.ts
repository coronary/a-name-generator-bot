import { Client, IntentsBitField } from 'discord.js';
import { setCommands } from './setCommands';

const client = new Client({
	'intents': [
		IntentsBitField.Flags.Guilds,
		IntentsBitField.Flags.GuildMembers,
		IntentsBitField.Flags.GuildMessages,
		IntentsBitField.Flags.MessageContent,
	]
});

const getNewName = async (): Promise<string> => {
	const names = await Bun.file('assets/omnibus.json', { type: 'application/type' }).json()
	const random = Math.floor(Math.random() * names.length)
	return Promise.resolve(names[random])
}

client.on('interactionCreate', async ( int ) => {
	if(!int.isChatInputCommand()) {
		return
	}
	if(int.commandName === 'name') {
		await getNewName().then( name => int.reply({content: name, ephemeral: true}))
	}
})

setCommands()
	.then( () => {
			client.login(process.env.APP_TOKEN);
	})
	.catch((e) => {
		console.log(e)
})

