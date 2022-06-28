import { BaseCommandInteraction } from "discord.js";
export declare class SlashCommandContext {
    interaction: BaseCommandInteraction;
    args: string[];
    command: string;
    constructor(interaction: BaseCommandInteraction);
    getCommandName(): string;
}
