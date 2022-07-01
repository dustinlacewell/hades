import { BaseCommandInteraction, Client } from "discord.js";
import { SlashCommandContext } from "../../models/SlashCommandContext";
import { SlashCommandFactoryRegistry } from "../SlashCommandFactory/SlashCommandFactoryRegistry";
import { SlashParserService } from "./SlashParserService";
import { Command } from "../../builtins/Command";
export declare class SlashCommandService {
    /** service for parsing incoming interactions */
    parserService: SlashParserService;
    /** factories for creating command instances */
    factories: SlashCommandFactoryRegistry;
    execute(ctx: SlashCommandContext): Promise<void>;
    dispatch(interaction: BaseCommandInteraction): void;
    registerCommands(client: Client): Promise<void>;
    protected getCommandRegistrationMeta(): Command[];
}
