"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const Command_1 = __importDefault(require("../commands/Command"));
const command_1 = __importDefault(require("../decorators/command"));
const description_1 = __importDefault(require("../decorators/description"));
const CommandService_1 = __importDefault(require("../services/CommandService"));
let CommandsCommand = class CommandsCommand extends Command_1.default {
    execute() {
        const embed = this.commandService.commandsEmbed();
        return this.reply("all commands I know:", { embed });
    }
};
__decorate([
    inversify_1.inject(CommandService_1.default),
    __metadata("design:type", CommandService_1.default)
], CommandsCommand.prototype, "commandService", void 0);
CommandsCommand = __decorate([
    command_1.default("commands"),
    description_1.default("List all commands.")
], CommandsCommand);
exports.default = CommandsCommand;
//# sourceMappingURL=CommandsCommand.js.map