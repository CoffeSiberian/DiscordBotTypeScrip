"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        var _a, _b;
        if (((_a = client.user) === null || _a === void 0 ? void 0 : _a.tag) == null)
            return;
        console.log(`Ready! Logged in as ${(_b = client.user) === null || _b === void 0 ? void 0 : _b.tag}`);
    }
};
