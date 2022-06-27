import { BaseCommandInteraction } from "discord.js";

export class SlashCommandContext {
    interaction: BaseCommandInteraction;
    body: string;
    args: string[];
    success: boolean;
    command: string;

    constructor(interaction: BaseCommandInteraction, parsed: any) {
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
