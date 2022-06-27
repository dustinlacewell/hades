"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlashCommandContext = void 0;
class SlashCommandContext {
    constructor(interaction, parsed) {
        this.interaction = interaction;
        this.command = parsed.command;
        this.body = parsed.body;
        this.args = parsed.arguments;
        this.success = parsed.success;
    }
    getString() {
        return this.body;
    }
}
exports.SlashCommandContext = SlashCommandContext;
//# sourceMappingURL=SlashCommandContext.js.map