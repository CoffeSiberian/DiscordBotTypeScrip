"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_json_1 = require("./config.json");
const discord_js_1 = require("discord.js");
const events_1 = require("./events");
const commands_1 = require("./commands");
const client = new discord_js_1.Client({ intents: [discord_js_1.GatewayIntentBits.Guilds] });
const commands = new commands_1.AllCommands(config_json_1.token, config_json_1.clientId);
new events_1.Events_Bot(client); //agregamos los eventos
client.commands = new discord_js_1.Collection();
commands.getAllCommands().forEach(command => client.commands.set(command.data.name, command));
client.login(config_json_1.token);
