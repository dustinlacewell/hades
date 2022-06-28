"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlashCommandContext = void 0;
class SlashCommandContext {
    constructor(interaction) {
        this.interaction = interaction;
        this.command = interaction.commandName;
        this.args = [];
    }
    getCommandName() {
        return this.command;
    }
}
exports.SlashCommandContext = SlashCommandContext;
//# sourceMappingURL=SlashCommandContext.js.map