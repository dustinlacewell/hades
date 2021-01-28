"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = __importDefault(require("../commands/Command"));
const command_1 = __importDefault(require("../decorators/command"));
let PingCommand = class PingCommand extends Command_1.default {
    execute() {
        const then = this.msg.createdTimestamp;
        const now = Date.now();
        const delta = new Date(now - then);
        const seconds = delta.getSeconds();
        const milliseconds = delta.getMilliseconds();
        const total = (seconds * 1000 + milliseconds) / 1000.0;
        return this.reply(`Pong in ${total} seconds!`);
    }
};
PingCommand = __decorate([
    command_1.default("ping")
], PingCommand);
exports.default = PingCommand;
//# sourceMappingURL=PingCommand.js.map