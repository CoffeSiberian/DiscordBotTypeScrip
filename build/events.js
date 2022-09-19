"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Events_Bot = void 0;
const interactionCreate = require('./events/interactionCreate');
const ready = require('./events/ready');
class Events_Bot {
    constructor(clientObj) {
        this.client = clientObj;
        this.addFromArray([interactionCreate, ready]);
    }
    ;
    addEvent(event) {
        if (event.once) {
            this.client.once(event.name, (...args) => event.execute(...args));
        }
        else {
            this.client.on(event.name, (...args) => event.execute(...args));
        }
    }
    ;
    addFromArray(eventArray) {
        eventArray.forEach(event => this.addEvent(event));
    }
    ;
}
exports.Events_Bot = Events_Bot;
;
