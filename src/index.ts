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

// TODO: replace with d.ts file in api folder
interface NameResponse {
	name: string;
	ok: boolean;
}

const getNewName = async (): Promise<NameResponse> => {
	return await fetch(`${process.env.API_URL}/getName`).then( res => res.json())
}

client.on('interactionCreate', async ( int ) => {
	if(!int.isChatInputCommand()) {
		return
	}
	if(int.commandName === 'name') {
		await getNewName().then( ({ name }) => int.reply({content: name, ephemeral: true}))
	}
})

setCommands()
	.then( () => {
			client.login(process.env.APP_TOKEN);
	})
	.catch((e) => {
		console.log(e)
})

