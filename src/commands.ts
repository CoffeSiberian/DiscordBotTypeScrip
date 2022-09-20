import  { REST }    from '@discordjs/rest';
import  { Routes }  from 'discord.js';
import  { createSubCommad } from './commands/type_sub_commands'

import  { GrupExample } from './commands/grup_command';
import { Musica } from './commands/musica';

export class AllCommands {

    GrupExample: GrupExample = new GrupExample();
    Musica: Musica = new Musica();
    
    rest_api: REST = new REST({ version: '10' });
    clientId: string;
    commandsGrup: Array<any>;
    constructor( token:string, clientId:string ){
        this.rest_api.setToken(token);
        this.clientId = clientId;
        this.commandsGrup = [];
        this.getAllJson();
        this.putCommands();
    };

    getAllJson(){
        let GrupCommands = [this.GrupExample.toJSON(), this.Musica.toJSON()]; // Agregamos las clases instanciadas dentro de la lista
        GrupCommands.forEach(grupCommand => this.commandsGrup.push(grupCommand));
    };

    putCommands(){
        this.rest_api.put(Routes.applicationCommands(this.clientId), { body: this.commandsGrup })
        .then(() => console.log('Successfully registered application commands.'))
        .catch(console.error);
    };

    getAllCommands(){
        let getAny:Array<createSubCommad> = [];
        this.commandsGrup.forEach(grupCommand => grupCommand['commands'].forEach((command: createSubCommad) => getAny.push(command)));
        return getAny;
    };

};