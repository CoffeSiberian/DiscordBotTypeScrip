"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllCommands = void 0;
const rest_1 = require("@discordjs/rest");
const discord_js_1 = require("discord.js");
const grup_command_1 = require("./commands/grup_command");
class AllCommands {
    constructor(token, clientId) {
        this.GrupExample = new grup_command_1.GrupExample();
        this.rest_api = new rest_1.REST({ version: '10' });
        this.rest_api.setToken(token);
        this.clientId = clientId;
        this.commandsGrup = [];
        this.getAllJson();
        this.putCommands();
    }
    ;
    getAllJson() {
        let GrupCommands = [this.GrupExample.toJSON()]; // Agregamos las clases instanciadas dentro de la lista
        GrupCommands.forEach(grupCommand => this.commandsGrup.push(grupCommand));
    }
    ;
    putCommands() {
        this.rest_api.put(discord_js_1.Routes.applicationCommands(this.clientId), { body: this.commandsGrup })
            .then(() => console.log('Successfully registered application commands.'))
            .catch(console.error);
    }
    ;
    getAllCommands() {
        let getAny = [];
        this.commandsGrup.forEach(grupCommand => grupCommand['commands'].forEach((command) => getAny.push(command)));
        return getAny;
    }
    ;
}
exports.AllCommands = AllCommands;
;
