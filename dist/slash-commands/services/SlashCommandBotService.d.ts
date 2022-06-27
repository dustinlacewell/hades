import { Interaction } from 'discord.js';
import { HadesBotService } from "../../services/HadesBotService";
import { SlashCommandService } from "./SlashCommandService/SlashCommandService";
export declare class SlashCommandBotService extends HadesBotService {
    commandService: SlashCommandService;
    onInteractionCreate<T extends Interaction>(interaction: T): Promise<void>;
}
