"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GrupExample = void 0;
const discord_js_1 = require("discord.js");
class GrupExample extends discord_js_1.SlashCommandBuilder {
    constructor(name = 'testing', description = 'Comandos de prueba') {
        super();
        this.commands = [];
        this.setName(name);
        this.setDescription(description);
        this.setDMPermission(false);
        this.addCommandsToList();
        this.addCommandsToGrup();
    }
    ;
    addCommandsToList() {
        let holaMundoCommand = {
            data: new discord_js_1.SlashCommandSubcommandBuilder()
                .setName('holamundo')
                .addStringOption(option => option.setName('nombre').setDescription('Tu nombre').setRequired(true))
                .setDescription('Hola Mundo!'),
            execute: Function()
        };
        let otrocmdCommand = {
            data: new discord_js_1.SlashCommandSubcommandBuilder()
                .setName('otrocmd')
                .setDescription('Nada que ver'),
            execute: Function()
        };
        holaMundoCommand.execute = this.holamundo;
        otrocmdCommand.execute = this.otrocmd; // agregamos la funcionalidad
        this.commands.push(holaMundoCommand, otrocmdCommand); // agregamos los comandos
    }
    ;
    addCommandsToGrup() {
        this.commands.forEach(command => this.addSubcommand(command.data));
    }
    ;
    //logica de comandos
    holamundo(interaction) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            let name = (_a = interaction.options.get('nombre')) === null || _a === void 0 ? void 0 : _a.value;
            yield interaction.reply({ content: 'hola mundo ' + name, ephemeral: true });
        });
    }
    ;
    otrocmd(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            yield interaction.reply({ content: 'cmd!!' });
        });
    }
}
exports.GrupExample = GrupExample;
;
