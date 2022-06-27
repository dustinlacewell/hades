import { BaseCommandInteraction } from "discord.js";
import { SlashCommandContext } from "../../models";
export declare type SlashParserServiceOptions = {
    prefix?: string;
};
export declare const defaults: SlashParserServiceOptions;
export declare class SlashParserService {
    options: SlashParserServiceOptions;
    constructor(options?: SlashParserServiceOptions);
    /**
     * Parse a Discord.js interaction into a SlashCommandContext
     * @param msg The underlying Discord.js Slash Command Interaction
     * @returns A new SlashCommandContext or null
     */
    parse(interaction: BaseCommandInteraction): SlashCommandContext | null;
}
