import { BaseCommandInteraction } from "discord.js";

export class SlashCommandContext {
    interaction: BaseCommandInteraction;
    args: string[];
    command: string;

    constructor(interaction: BaseCommandInteraction) {
        this.interaction = interaction;
        this.command = interaction.commandName;
        this.args = [];
    }

    getCommandName() {
      return this.command;
    }
}
