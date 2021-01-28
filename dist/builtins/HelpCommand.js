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
const CommandService_1 = __importDefault(require("../services/CommandService"));
const arg_1 = __importDefault(require("../decorators/arg"));
const description_1 = __importDefault(require("../decorators/description"));
const validate_1 = __importDefault(require("../decorators/validate"));
const command_1 = __importDefault(require("../decorators/command"));
const ArgError_1 = __importDefault(require("../commands/ArgError"));
let HelpCommand = class HelpCommand extends Command_1.default {
    validateCommandName() {
        this.helpEmbed = this.commandService.helpFor(this.commandName);
        if (!this.helpEmbed) {
            throw new ArgError_1.default(`Couldn't find a "${this.commandName}" command. :weary:`);
        }
    }
    execute() {
        return this.reply({ embed: this.helpEmbed });
    }
};
__decorate([
    arg_1.default(),
    description_1.default("Name of the command."),
    __metadata("design:type", String)
], HelpCommand.prototype, "commandName", void 0);
__decorate([
    inversify_1.inject(CommandService_1.default),
    __metadata("design:type", CommandService_1.default)
], HelpCommand.prototype, "commandService", void 0);
__decorate([
    validate_1.default('commandName'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HelpCommand.prototype, "validateCommandName", null);
HelpCommand = __decorate([
    command_1.default("help"),
    description_1.default(`
Get help on commands.
Use the \`commands\` command to list all commands.`)
], HelpCommand);
exports.default = HelpCommand;
//# sourceMappingURL=HelpCommand.js.map