const interactionCreate = require('./events/interactionCreate');
const ready = require('./events/ready');

import { createEvent } from './events/type';
import { Client } from 'discord.js';

export class Events_Bot {
    client:Client;
    constructor ( clientObj:Client ){
        this.client = clientObj;
        this.addFromArray([interactionCreate, ready]);
    };

    addEvent( event:createEvent ){
        if (event.once) {
            this.client.once(event.name, (...args) => event.execute(...args));
        } else {
            this.client.on(event.name, (...args) => event.execute(...args));
        }
    };
    
    addFromArray( eventArray:Array<createEvent> ){
        eventArray.forEach(event => this.addEvent( event ));
    };

};