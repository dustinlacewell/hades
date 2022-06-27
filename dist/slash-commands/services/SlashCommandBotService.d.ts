import { BaseCommandInteraction, Message } from 'discord.js';
import { HadesBotService } from "../../services/HadesBotService";
import { SlashCommandService } from "./SlashCommandService/SlashCommandService";
export declare class SlashCommandBotService extends HadesBotService {
    commandService: SlashCommandService;
    onInteractionCreate<T extends BaseCommandInteraction>(interaction: T): Promise<void>;
    onMessage<T extends Message>(msg: T): Promise<void>;
}
