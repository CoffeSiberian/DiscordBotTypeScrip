import { token, clientId } from './config.json';
import { Client, Collection, GatewayIntentBits } from 'discord.js';
import { Events_Bot } from './events';
import { AllCommands } from './commands';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const commands = new AllCommands(token, clientId);
new Events_Bot(client); //agregamos los eventos
client.commands = new Collection();

commands.getAllCommands().forEach(command => client.commands.set(command.data.name, command));
client.login(token);