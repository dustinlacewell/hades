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
exports.HelpCommand = void 0;
const inversify_1 = require("inversify");
const TextCommand_1 = require("../models/TextCommand");
const TextArgError_1 = require("../errors/TextArgError");
const decorators_1 = require("../decorators");
const TextCommandHelpService_1 = require("../services/TextCommandHelpService");
let HelpCommand = class HelpCommand extends TextCommand_1.TextCommand {
    validateCommandName() {
        this.helpEmbed = this.helpService.getHelpEmbed(this.commandName);
        if (!this.helpEmbed) {
            throw new TextArgError_1.TextArgError(`Couldn't find a "${this.commandName}" command. :weary:`);
        }
    }
    execute() {
        return this.reply("Here's what I've got:", { embeds: [this.helpEmbed] });
    }
};
__decorate([
    (0, decorators_1.arg)(),
    (0, decorators_1.description)("Name of the command."),
    __metadata("design:type", String)
], HelpCommand.prototype, "commandName", void 0);
__decorate([
    (0, inversify_1.inject)(TextCommandHelpService_1.TextCommandHelpService),
    __metadata("design:type", TextCommandHelpService_1.TextCommandHelpService)
], HelpCommand.prototype, "helpService", void 0);
__decorate([
    (0, decorators_1.validate)('commandName'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HelpCommand.prototype, "validateCommandName", null);
HelpCommand = __decorate([
    (0, decorators_1.command)("help"),
    (0, decorators_1.description)(`
Get help on commands.
Use the \`commands\` command to list all commands.`)
], HelpCommand);
exports.HelpCommand = HelpCommand;
//# sourceMappingURL=HelpCommand.js.map