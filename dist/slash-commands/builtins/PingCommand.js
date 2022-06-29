"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PingCommand = void 0;
const decorators_1 = require("../decorators");
const SlashCommand_1 = require("../models/SlashCommand");
let PingCommand = class PingCommand extends SlashCommand_1.SlashCommand {
    execute() {
        const then = this.interaction.createdTimestamp;
        const now = Date.now();
        const delta = new Date(now - then);
        const seconds = delta.getSeconds();
        const milliseconds = delta.getMilliseconds();
        const total = (seconds * 1000 + milliseconds) / 1000.0;
        return this.reply(`Pong in ${total} seconds!`);
    }
};
PingCommand = __decorate([
    (0, decorators_1.command)("ping", {
        name: "ping",
        description: "Returns pong",
        type: "CHAT_INPUT",
    })
], PingCommand);
exports.PingCommand = PingCommand;
//# sourceMappingURL=PingCommand.js.map