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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandsCommand = void 0;
const inversify_1 = require("inversify");
const decorators_1 = require("../decorators");
const TextCommand_1 = require("../models/TextCommand");
const TextCommandHelpService_1 = require("../services/TextCommandHelpService");
let CommandsCommand = class CommandsCommand extends TextCommand_1.TextCommand {
    execute() {
        const embeds = [
            this.commandService.getCommandsEmbed(),
        ];
        return this.reply("all commands I know:", { embeds });
    }
};
__decorate([
    (0, inversify_1.inject)(TextCommandHelpService_1.TextCommandHelpService),
    __metadata("design:type", TextCommandHelpService_1.TextCommandHelpService)
], CommandsCommand.prototype, "commandService", void 0);
CommandsCommand = __decorate([
    (0, decorators_1.command)("commands"),
    (0, decorators_1.description)("List all commands.")
], CommandsCommand);
exports.CommandsCommand = CommandsCommand;
//# sourceMappingURL=CommandsCommand.js.map