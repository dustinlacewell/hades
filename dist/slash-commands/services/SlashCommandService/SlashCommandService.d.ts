import { BaseCommandInteraction, Client } from "discord.js";
import { SlashCommand } from "../../models";
import { SlashCommandContext } from "../../models/SlashCommandContext";
import { SlashCommandFactoryRegistry } from "../SlashCommandFactory/SlashCommandFactoryRegistry";
import { SlashParserService } from "./SlashParserService";
import { Command } from "../../commands/Command";
export declare class SlashCommandService {
    /** service for parsing incoming interactions */
    parserService: SlashParserService;
    /** factories for creating command instances */
    factories: SlashCommandFactoryRegistry;
    command: SlashCommand;
    execute(ctx: SlashCommandContext): Promise<void>;
    dispatch(interaction: BaseCommandInteraction): void;
    registerCommands(client: Client): Promise<void>;
    getCommandRegistrationMeta(): Command[];
}
