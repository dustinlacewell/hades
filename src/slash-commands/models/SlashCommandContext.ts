import { BaseCommandInteraction } from "discord.js";

export class SlashCommandContext {
    interaction: BaseCommandInteraction;
    body: string;
    args: string[];
    success: boolean;
    command: string;

    constructor(interaction: BaseCommandInteraction) {
        this.interaction = interaction;
    }
}
