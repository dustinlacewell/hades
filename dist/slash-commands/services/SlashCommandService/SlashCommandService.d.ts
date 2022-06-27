import { BaseCommandInteraction } from "discord.js";
import { SlashCommandContext } from "../../models/SlashCommandContext";
import { SlashCommandFactoryRegistry } from "../SlashCommandFactory/SlashCommandFactoryRegistry";
import { SlashParserService } from "./SlashParserService";
export declare class SlashCommandService {
    /** service for parsing incoming interactions */
    parserService: SlashParserService;
    /** factories for creating command instances */
    factories: SlashCommandFactoryRegistry;
    execute(ctx: SlashCommandContext): Promise<void>;
    dispatch(interaction: BaseCommandInteraction): void;
}
