import { BaseCommandInteraction } from "discord.js";
export declare class SlashCommandContext {
    interaction: BaseCommandInteraction;
    body: string;
    args: string[];
    success: boolean;
    command: string;
    constructor(interaction: BaseCommandInteraction, parsed: any);
    getString(): string;
}
