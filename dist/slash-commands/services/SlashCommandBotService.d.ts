import { Interaction } from 'discord.js';
import { HadesBotService } from "../../services/HadesBotService";
import { SlashCommandService } from "./SlashCommandService/SlashCommandService";
export interface GuildConfig {
    id: string;
    lang: string;
    prefix: string;
    almanaxChannel: string;
    partyChannel: string;
    buildPreview: string;
}
export declare class SlashCommandBotService extends HadesBotService {
    commandService: SlashCommandService;
    onReady(): Promise<void>;
    onInteractionCreate<T extends Interaction>(interaction: T): Promise<void>;
}
