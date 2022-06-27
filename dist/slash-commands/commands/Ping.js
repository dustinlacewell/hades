"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPingData = void 0;
const builders_1 = require("@discordjs/builders");
const getPingData = (lang) => {
    const builder = new builders_1.SlashCommandBuilder();
    builder
        .setName('ping')
        .setDescription("Request Ping");
    return builder;
};
exports.getPingData = getPingData;
//# sourceMappingURL=Ping.js.map